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

mongoose
    .connect(config.uri)
    .then(() => console.log('Connected to the database:', process.env.DB_NAME))
    .catch((err) => console.error('Error connecting to database:', err));

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: false }));

app.use('/users', users);

app.get('*', (req, res) => {
    //   res.sendFile(path.join(__dirname + '/app/dist/index.html'));
});

app.listen(PORT || 52847, () => {
    console.log('Connected on port ' + PORT);
});
