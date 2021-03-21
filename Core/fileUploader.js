const multer = require('multer');
var path = require('path')
var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads');
    },
    filename: function(req,file,cb){
        console.log(path.extname(file.originalname))
        cb(null,Date.now() +file.originalname);
    }

})
exports.upload = multer({storage: storage})