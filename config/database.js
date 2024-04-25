require('dotenv').config();
const crypto = require('crypto');

const secret = 'meguizo';

const hash = crypto.createHmac('sha256', secret).update('akeem').digest('hex');

require('dotenv').config();

module.exports = {
    uri: process.env.DB_URI,
    secret: hash,
};
