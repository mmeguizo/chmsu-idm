const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const { comparePassword } = require('../config/password');

module.exports = (router) => {
    router.post('/register', async (req, res) => {
        console.log({ req: req.body });

        const { email, username, password, role } = req.body;

        const userExists = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { username: username.toLowerCase() },
            ],
        });

        if (userExists) {
            return res.json({
                success: false,
                message: 'User name or Email already exists',
            });
        }
        if (!email || !username || !password) {
            return res.json({
                success: false,
                message:
                    'Invalid input, please provide email, username and matching password',
            });
        }

        try {
            const newUser = new User({
                id: uuidv4(),
                email: email.toLowerCase(),
                username: username.toLowerCase(),
                password,
                role: role.toLowerCase(),
            });

            const savedUser = await newUser.save();

            res.json({
                success: true,
                message: 'This user is successfully Registered',
                data: { email: savedUser.email, username: savedUser.username },
            });
        } catch (err) {
            console.error(err);

            const errorMessages = Object.values(err.errors).map(
                ({ message }) => message
            );

            return res.json({
                success: false,
                message: errorMessages.join(', '),
            });
        }
    });

    router.get('/checkEmail/:email', (req, res) => {
        if (!req.params.email) {
            res.json({ success: false, message: 'Email not provided ' });
        } else {
            User.findOne({ email: req.params.email }, (err, email) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (email) {
                        res.json({
                            success: false,
                            message: 'Email already taken',
                        });
                    } else {
                        res.json({ success: true, message: 'Email available' });
                    }
                }
            });
        }
    });

    router.get('/checkUsername/:username', (req, res) => {
        if (!req.params.username) {
            res.json({ success: false, message: 'Email not provided ' });
        } else {
            User.findOne({ username: req.params.username }, (err, username) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (username) {
                        res.json({
                            success: false,
                            message: 'Username already taken',
                        });
                    } else {
                        res.json({
                            success: true,
                            message: 'Username available',
                        });
                    }
                }
            });
        }
    });

    // login
    router.post('/login', async (req, res) => {
        const { username, password } = req.body;

        if (!username) {
            return res.json({
                success: false,
                message: 'No Username was provided',
            });
        }

        if (!password) {
            return res.json({
                success: false,
                message: 'No password was provided',
            });
        }

        try {
            const user = await User.findOne({
                username: username.toLowerCase(),
            });

            if (!user) {
                return res.json({ success: false, message: 'User not found' });
            }

            const isMatch = await comparePassword(password, user.password);

            if (!isMatch) {
                return res.json({
                    success: false,
                    message: 'Password is incorrect',
                });
            }

            const newUser = user.toObject();
            delete newUser.password;
            // delete newUser._id;
            delete newUser.__v;

            const token = jwt.sign(newUser, config.secret, {
                expiresIn: '24h',
            });
            return res.json({
                success: true,
                message: 'Password is Correct',
                token,
            });
        } catch (error) {
            return res.json({ success: false, message: error.message });
        }
    });

    // any route that needs authorization or token should be under it if not above this middleware
    router.use((req, res, next) => {
        //'@auth0/angular-jwt' automatically adds token in the headers but it also add the world 'Bearer ' so i manually format it
        //i slice the word 'Bearer '  = 7
        //let token = (req.headers['authorization']).slice(7);
        var token = '';
        // if (req.headers['authorization']) {
        //     token = req.headers['authorization'].substring(
        //         req.headers['authorization'].indexOf(' ') + 1
        //     );
        // }
        token = req.headers['authorization'];

        if (!token) {
            res.json({ success: false, message: 'No token provided' });
        } else {
            //decrypt token
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    //expire or invalid
                    res.json({
                        success: false,
                        message: 'Token invalid :' + err,
                    });
                } else {
                    //assign token to headers
                    req.decoded = decoded;
                    //to break to this functions if not it will just loop
                    next();
                }
            });
        }
    });

    return router;
};
