'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    media: [
        {
            type: String,
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],

    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    shares: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Share'
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    isDeleted: {
        type: Boolean,
        default: false
    }
})
module.exports = mongoose.model('Post', UserSchema);
