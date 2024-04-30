const bcrypt = require('bcryptjs');

/**
 * Compares the plain text password with the stored hashed password
 * @param {string} password Plain text password
 * @param {string} hash Hashed password
 * @returns {Promise<boolean>} True if the passwords match, false otherwise
 */
exports.comparePassword = async (password, hash) => {
    const result = await bcrypt.compare(password, hash);
    return Promise.resolve(result);
};

/**
 * Generates a hash for the given password
 * @param {string} password The password to hash
 * @returns {Promise<string>} The hashed password
 */
exports.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return Promise.resolve(hash);
};
