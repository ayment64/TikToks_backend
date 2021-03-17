const multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads');
    },
    filename: function(req,file,cb){
        console.log(req.body)
        cb(null,Date.now() + '.png');
    }

})
exports.upload = multer({storage: storage})