const firebase = require('firebase');
const config = require('./config');

const db = firebase.initializeApp(config.firebaseconfig);

module.exports = db;