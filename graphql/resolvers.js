const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const User = mongoose.model('user');

exports.hello = () => 'Welcome to GraphQL';

exports.test = (args) => args.value;

exports.allUsers = async () => {
    const users = await User.find();
    const list = [];
    users.forEach((user) => {
        list.push({
            _id: user._id,
            username: user.username,
            email: user.email,
            image: user.image,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    });
    return list;
};

exports.createUser = async (args, req) => {
    const {
        data: { username, email, password },
    } = args;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error(
            `${email} is already associated with an account. Please try another email address`
        );
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User({ email, password: hash });
    if (username) {
        user.username = username;
    }
    const result = await user.save();

    return {
        _id: result._id,
        username: result.username,
        email: result.email,
        image: result.image,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
    };
};

exports.addProfilePic = async (args, req) => {
    const {
        data: { image, _id },
    } = args;

    const user = await User.findById(_id);
    if (!user) {
        throw new Error('Something went wrong. Please try again!');
    }

    user.image = image;
    const result = await user.save();

    return {
        _id: result._id,
        username: result.username,
        email: result.email,
        image: result.image,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
    };
};
