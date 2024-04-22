let bcrypt = require('bcryptjs');

module.exports.comparePassword = function (password, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function (err, res) {
            if (err) reject(err);
            else {
                resolve(res);
            }
        });
    });
};
