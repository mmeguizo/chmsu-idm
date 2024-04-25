const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
let bcrypt = require('bcryptjs');
const { comparePassword } = require('../config/password');

module.exports = (router) => {
    // router.post('/login', async (req, res) => {
    //     const { username, password } = req.body;

    //     if (!username) {
    //         return res.json({
    //             success: false,
    //             message: 'No Username was provided',
    //         });
    //     }

    //     if (!password) {
    //         return res.json({
    //             success: false,
    //             message: 'No password was provided',
    //         });
    //     }

    //     try {
    //         const user = await User.findOne({
    //             username: username.toLowerCase(),
    //         });

    //         if (!user) {
    //             return res.json({ success: false, message: 'User not found' });
    //         }

    //         if (await comparePassword(password, user.password)) {
    //             const newUser = user.toObject();
    //             delete newUser.password;
    //             delete newUser._id;
    //             delete newUser.__v;

    //             return res.json({
    //                 success: true,
    //                 message: 'Password is Correct',
    //                 newUser,
    //             });
    //         }

    //         return res.json({
    //             success: false,
    //             message: 'Password is incorrect',
    //         });
    //     } catch (error) {
    //         return res.json({ success: false, message: error.message });
    //     }
    // });

    // router.post('/register', async (req, res) => {
    //     console.log({ req: req.body });

    //     const { email, username, password, role } = req.body;

    //     const userExists = await User.findOne({
    //         $or: [
    //             { email: email.toLowerCase() },
    //             { username: username.toLowerCase() },
    //         ],
    //     });

    //     if (userExists) {
    //         return res.json({
    //             success: false,
    //             message: 'User name or Email already exists',
    //         });
    //     }
    //     if (!email || !username || !password) {
    //         return res.json({
    //             success: false,
    //             message:
    //                 'Invalid input, please provide email, username and matching password',
    //         });
    //     }

    //     try {
    //         const newUser = new User({
    //             id: uuidv4(),
    //             email: email.toLowerCase(),
    //             username: username.toLowerCase(),
    //             password,
    //             role: role.toLowerCase(),
    //         });

    //         const savedUser = await newUser.save();

    //         res.json({
    //             success: true,
    //             message: 'This user is successfully Registered',
    //             data: { email: savedUser.email, username: savedUser.username },
    //         });
    //     } catch (err) {
    //         console.error(err);

    //         const errorMessages = Object.values(err.errors).map(
    //             ({ message }) => message
    //         );

    //         return res.json({
    //             success: false,
    //             message: errorMessages.join(', '),
    //         });
    //     }
    // });

    // router.get('/getAllUser', async (req, res) => {
    //     try {
    //         const users = await User.find({ deleted: false })
    //             .select({ id: 1, email: 1, username: 1, role: 1, status: 1 })
    //             .sort({ _id: -1 });

    //         if (users.length === 0) {
    //             return res.json({ success: false, message: 'No User found.' });
    //         }

    //         res.json({ success: true, users });
    //     } catch (err) {
    //         res.json({ success: false, message: err });
    //     }
    // });

    // router.put('/changeUserStatus', async (req, res) => {
    //     let data = req.body;

    //     try {
    //         let user = await User.findOne({ _id: data.id });

    //         let statusData = user.status === 'inactive' ? 'active' : 'inactive';

    //         let updatedUser = await User.findOneAndUpdate(
    //             { _id: data.id },
    //             { status: statusData },
    //             { upsert: true, new: true }
    //         ).select('-password -_id -id');

    //         res.json({
    //             success: true,
    //             message: 'Successfully set User Status',
    //             data: updatedUser,
    //         });
    //     } catch (err) {
    //         res.json({
    //             success: false,
    //             message: err.message,
    //         });
    //     }
    // });

    // router.put('/setInactiveUser', async (req, res) => {
    //     let data = req.body;

    //     try {
    //         let user = await User.findOne({ _id: data.id });

    //         let statusData = (user.status = 'deleted');
    //         let updatedUser = await User.findOneAndUpdate(
    //             { _id: data.id },
    //             { status: statusData, deleted: true },
    //             { upsert: true, new: true }
    //         ).select('-password -_id -id');

    //         res.json({
    //             success: true,
    //             message: 'Successfully set User Inactive',
    //             data: updatedUser,
    //         });
    //     } catch (err) {
    //         res.json({
    //             success: false,
    //             message: err.message,
    //         });
    //     }
    // });

    return router;
};
