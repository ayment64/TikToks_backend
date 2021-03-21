require('dotenv').config()
const Event = require('../Model/Event');
const User = require('../Model/User');
const UserController = require('./UserController');

//////////Add Event//////////////////////
exports.add_Event = async function (req, res) {
    console.log("aaaaa");
    console.log(req.body);
    try {
        const resultData = await Event.create(req.body).catch(err => err);
        res.send({ msg: 'OK', data: resultData })

    } catch (err) {
        res.json({ message: err.message })
    }

}


//////////Update Event//////////////////////
exports.Update_Event = async function (req, res) {

    console.log('aaaa');

    const resultData = await Event.updateOne({ event: req.params._id }, { $set: req.body }).catch(err => err)
    console.log(resultData);

    res.send({ msg: 'OK', data: resultData })

}



//////////Delete Event//////////////////////
exports.Delete_Event = async function (req, res) {

    console.log(req.body);


    try {
        const requestOwner = await User.findOne({ user: req.body.user })

        if (requestOwner.isAdmin) {
            const deletedTouser = await Event.findOne({ _id: req.body.eventToDelete })
            console.log("----------------------------------------------------------------------")
            console.log(deletedTouser)
            console.log("----------------------------------------------------------------------")
            const Delete_Event = await Event.findOneAndUpdate({ event: deletedTouser }, { isDeleted: true });
            console.log(Delete_Event)
            res.status(200).json({ "message": "Event deleted" })
        } else {
            res.status(403).json({ "message": 'unAuthorised Acceess' })
        }

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

//////////Get all Events//////////////////////
exports.All_Events = async function (req, res) {

    // if (req.params.id === 'all') {
    //     const resultData = await Event.find({ 'event': req.body.event }).populate({path: 'event' }).exec();
    //     res.send({ msg: 'OK', data: resultData });
    // } else {
    //     const resultData = await Event.findOne({ _id: req.params.id }).populate({ path: 'event' })
    //         .populate({ path: 'admin' }).exec();
    //     res.send({ msg: 'OK', data: resultData });
    // }
    try {

        const event = await Event.find().populate({ path: 'user' }).populate({ path: ' participants' });
        res.json(event);

    } catch (err) {
        res.json({ message: err });
    }

}
//participater à un event
exports.Participer_Event = async function (res, req) {

    console.log(req.body);
    var currentuser = JSON.stringify(req.body.user);
    try {
        await Event.findOneAndUpdate({ event: req.body.event }, { $push: { participants: req.body.user } })
        await Profile.findOneAndUpdate({ user: req.body.user }, { $push: { participation: req.body.event } })
        const accessToken = jwt.sign(currentuser, process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({ accessToken })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

//annuler la participation 
exports.DeleteParticipation_Event = async function (res, req) {
    console.log(req.body);
    var currentuser = JSON.stringify(req.body.user);
    try {
        await Event.findOneAndUpdate({ event: req.body.event }, { $delete: { participants: req.body.user } })
        await Profile.findOneAndUpdate({ user: req.body.user }, { $delete: { participation: req.body.event } })
        const accessToken = jwt.sign(currentuser, process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({ accessToken })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

//get all event 
exports.GetParticipants_Event = async function (res, req) {
    try {

        await Event.find({ 'event': req.body.user._id }, { countparticipants: { $size: "$participants" } }).populate({ path: "participants" })
        res.status(200).json({ Participants })

    } catch (error) {
        res.json(error)
    }


}