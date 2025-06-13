const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/ // Regex pour valider le format de l'email
    },
    password: {
        type: String,
        required: true,
        minlength: 6 
    },
},
    {
        timestamps: true // pour ajouter les champs createdAt et updatedAt automatiquement
    }
)

// Appliquer le plugin uniqueValidator pour valider l'unicité des champs avant de sauvegarder dans la base de données
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
// Exporter le modèle User pour l'utiliser dans d'autres parties de l'application