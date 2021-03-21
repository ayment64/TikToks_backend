
const express = require('express');
const app = express();
const db = require('./Environnement/Connection.js');
const cors = require('cors')

app.use(express.json());

const eventRouter = require('./Router/EventRouter');
// se connecter à mongo db
db();
// démarre le serveur express
const Port = 3000;
app.listen(Port, () => console.log('serveur started on ' + Port));
// app.use(cors)
 // ajouter des routes au serveur
 app.use('/user', require('./Router/UserRouter'));
 app.use('/Posts', require('./Router/PostRouter'));
 app.use('/Event', eventRouter );
