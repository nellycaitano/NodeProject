const jwt = require('jsonwebtoken');
const user = require('../models/user');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split('')[1]; // récupération du token depuis l'en-tête Authorization
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // vérification du token avec la clé secrète
        const userId = decodedToken.userId;
        res.auth = {
            userId: userId  // ajout du userId dans l'objet de réponse
        }
        next();
    }
    catch (error) {
        res.status(401).json({error})
    }
}