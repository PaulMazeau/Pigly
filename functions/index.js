const {onRequest} = require("firebase-functions/v2/https");

exports.helloWorld = onRequest((request, response) => {
  response.send("Helloooo World!");
});
