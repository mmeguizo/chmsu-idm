const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const roleEnum = {
    values: ['admin', 'user'],
    message: 'enum validator failed for path `{PATH}` with value `{VALUE}`',
};

const statusEnum = {
    values: ['active', 'inactive', 'pending', 'deleted'],
    message: 'enum validator failed for path `{PATH}` with value `{VALUE}`',
};

const userSchema = new Schema({
    id: { type: String, required: true, unique: true },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    role: { type: String, enum: roleEnum, required: true },
    status: {
        type: String,
        enum: statusEnum,
        required: true,
        default: 'pending',
    },
    deleted: { type: Boolean, default: false, required: true },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    } else {
        bcrypt.genSalt((err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) return next(err);
                this.password = hash;
                next(err);
            });
        });
    }
});

module.exports = mongoose.model('User', userSchema);
