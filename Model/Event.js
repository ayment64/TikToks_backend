var mongoose = require('mongoose');
const User = require('./User');
var Schema = mongoose.Schema;
var EventSchema = new Schema({
    title: { type: String, unique: true, required: true },
    price: { type: Number, required: true },
    Date: { type: Number, default: Date.now() },
    duration: { type: Number, required: false },
    location: { type: String },
    limit: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isDeleted: { type: Boolean, required: true },
 


   })
module.exports = mongoose.model('Event', EventSchema);