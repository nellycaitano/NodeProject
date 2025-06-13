const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//app permet de créer une application Express 
const app = express();

// Importation des routes
const userRoutes = require('./routes/user');

// Middleware pour parser le corps des requêtes JSON
app.use(bodyParser.json());

// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://nellycaitano:querty14@cluster0.e67ps0j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',  { useNewUrlParser: true,
    useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

// Middleware pour gérer les CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/auth', userRoutes);

module.exports = app;