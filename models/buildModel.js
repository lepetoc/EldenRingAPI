// LES MODELS SONT SUSCEPTIBLES DE NE PAS ETRE UTILISES DANS LE PROJET
// UNE AUTRE BASE DE DONNEES QUE MONGODB SERA SUREMENT UTILISEE MAIS LES CHAMPS ET LES TYPES RESTERONT LES MEMES
const mongoose = require('mongoose');

const buildSchema = mongoose.Schema({
    name: {type:String, required: true}, // Le nom du build choisis par l'utilisateur
    description: {type:String, required: false}, // description du build choisis par l'utilisateur
    class: { type: String, enum: [/*Renseigner toutes les classes de elden ring */], default: 'public' }, // Classe du build choisis par l'utilisateur PEUT ETRE CHANGER EN ENUM
    items: {type:Array, required: true}, // Liste des objets présents dans le build choisis par l'utilisateur
    version: {type:String, required: false}, // Version du jeu dans laquelle le build a été créé
    tags: { type: [String], required: false }, // Des tags pour faciliter la recherche

    visibility: { type: String, enum: ['public', 'private'], default: 'public' }, // Si le build est privé ou public

    creationDate: {type:Date, required: true},
    modificationDate: {type:Date, required: true},

    creationUser: {type:String, required: true},
    modificationUser: {type:String, required: true},
    active: {type:Boolean, required: true},
});

module.exports = mongoose.model('Elden Ring', buildSchema);