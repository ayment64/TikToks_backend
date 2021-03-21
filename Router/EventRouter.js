const express = require('express');
const EventController = require('../Controller/EventController');
const Event = require('../Model/Event');
const { authenticateToken } = require('../Core/jwt')
const router = express.Router();


//ajouter event
router.post('/', authenticateToken, EventController.add_Event);
//update event 
router.post('/updateEvent', authenticateToken, EventController.Update_Event);
//delete event 
router.post('/DeleteEvent/:id', authenticateToken, EventController.Delete_Event);
//afficher events 
router.get('/all', authenticateToken, EventController.All_Events);
//participater à un event
router.post('/paticipation', authenticateToken, EventController.Participer_Event);
//annuler la participation 
router.post('/annuler', authenticateToken, EventController.DeleteParticipation_Event);
//get all event 
router.get('/Participation', authenticateToken, EventController.GetParticipants_Event);

module.exports = router;