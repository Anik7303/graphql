const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
    },
    { timestamps: true }
);

mongoose.model('post', postSchema);
