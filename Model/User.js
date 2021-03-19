'use strict';
var mongoose = require('mongoose');
require('./Profile');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    
    password: {
        type: String,
        required: true
    },

    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile'
    },
   })
module.exports = mongoose.model('User', UserSchema);
