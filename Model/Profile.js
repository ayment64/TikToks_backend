'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default:false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    imageName: {
        type: String,

    }, friendlist: [
        {
            type: mongoose.Schema.Types.ObjectId,

            ref: 'User'
        }
    ],
    enabled : {
        type: Boolean,
        default : false
    }


})
module.exports = mongoose.model('profile', UserSchema);
