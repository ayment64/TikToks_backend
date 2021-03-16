var mongoUrl = 'mongodb://localhost:27017/tiktoks'
var mongoose = require('mongoose')


module.exports = function () {
    mongoose.connect(mongoUrl,{ useNewUrlParser: true },{ useUnifiedTopology: true })
mongoose.connection.once('open', () => console.log('MongoDB connected')).on('error',(err)=>console.log(err));
}