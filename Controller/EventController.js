require('dotenv').config()
const Event = require('../Model/Event');
const User = require('../Model/User');

//////////Add Event//////////////////////
exports.add_Event = async function(req,res){
     console.log("aaaaa");
    console.log(req.body);
    const event = new Event({
        title: req.body.title ,
        price: req.body.price,
        Date: req.body.data,
        duration: req.body.duration,
        location: req.body.location ,
        limit: req.body.limit,

    });
    const resultData = await Event.create(req.body).catch(err => err);
    res.send({ msg: 'OK', data: resultData})
}


//////////Update Event//////////////////////
exports.Update_Event = async function(req,res){

    console.log('aaaa');

    const resultData = await Event.updateOne({ event: req.params._id }, { $set: req.body }).catch(err => err)
    console.log(resultData);

    res.send({ msg: 'OK', data: resultData })
    
}



//////////Delete Event//////////////////////
exports.Delete_Event = async function (req, res){

    console.log(req.body);


    try {
     const requestOwner = await User.findOne({user: req.body.user})

     if(requestOwner.isAdmin)
     {  const deletedTouser =await Event.findOne({_id: req.body.eventToDelete})
        console.log("----------------------------------------------------------------------")
        console.log(deletedTouser)
        console.log("----------------------------------------------------------------------")
        const Delete_Event = await Event.findOneAndUpdate({event:deletedTouser},{isDeleted:true});
         console.log(Delete_Event)
         res.status(200).json({"message": "Event deleted"})
     }else{
         res.status(403).json({"message":'unAuthorised Acceess'})
     }

    } catch (err) {
        res.status(400).json({ message: err.message })
    }


}
  //////////Get all Events//////////////////////
  exports.All_Events = async function (req,res) { 

    if (req.params.id === 'all') {
        const resultData = await Event.find().populate({ path: 'user' })
            .populate({ path: 'admin' }).exec();
        res.send({ msg: 'OK', data: resultData });
    } else {
        const resultData = await Event.findOne({ _id: req.params.id }).populate({ path: 'user' })
            .populate({ path: 'admin' }).exec();
        res.send({ msg: 'OK', data: resultData });
    }

}
