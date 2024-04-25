require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const config = require('./config/database');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const path = require('path');
require('http').Server(app);
// const http = require('http').Server(app);

//routes
const users = require('./routes/users')(router);
const authentication = require('./routes/authentication')(router);
const file = require('./routes/file')(router);

mongoose
    .connect(config.uri)
    .then(() => console.log('Connected to the database:', process.env.DB_NAME))
    .catch((err) => console.error('Error connecting to database:', err));

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: false }));

//for deployment on hosting and build
app.use(express.static(__dirname + '/app/dist/'));
app.use('/images', express.static(path.join(__dirname, './images')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads/files')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads/images')));

app.use('/users', users);
app.use('/authentication', authentication);
app.use('/fileupload', file);
app.use(
    '/profile_pic',
    express.static(path.join(__dirname, '../uploads/images'))
);

app.get('*', (req, res) => {
    //   res.sendFile(path.join(__dirname + '/app/dist/index.html'));
});

app.listen(PORT || 52847, () => {
    console.log('Connected on port ' + PORT);
});
