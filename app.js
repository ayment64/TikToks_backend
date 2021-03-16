
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const db = require('./Environnement/Connection.js');
app.use(express.json());
// se connecter à mongo db
db();
// démarre le serveur express
const Port = 3000;
app.listen(Port, () => console.log('serveur started on ' + Port));
 // ajouter des routes au serveur
 app.use('/user', require('./Router/UserRouter'));
