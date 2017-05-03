import { analyze } from 'mova';

const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.analyze = functions.https.onRequest((request, response) => {
 const original = request.query.text;

 response.send(analyze(original));
});
