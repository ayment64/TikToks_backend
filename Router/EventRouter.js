const express = require('express');
const EventController = require('../Controller/EventController');
const Event = require('../Model/Event');
const {authenticateToken} = require('../Core/jwt')
const router = express.Router();



router.post('/', authenticateToken, EventController.add_Event);
router.post('/updateEvent',authenticateToken, EventController.Update_Event);
router.post('/DeleteEvent/:id',authenticateToken, EventController.Delete_Event);
router.get('/:id',authenticateToken, EventController.All_Events);

module.exports = router;