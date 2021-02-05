const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            unique: true,
        },
        image: {
            type: String,
            default: 'default.png',
        },
    },
    { timestamps: true }
);

mongoose.model('user', userSchema);
