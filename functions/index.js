/* eslint-disable object-curly-spacing */
// functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();

exports.addUser = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { username, email, password } = req.body;
    try {
      await admin.firestore().collection("users").doc(email).set({
        username,
        email,
        password,
      });
      res.status(200).send("User added successfully");
    } catch (error) {
      res.status(500).send(error.toString());
    }
  });
});

exports.addFeedback = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { name, email, message } = req.body;
    try {
      await admin.firestore().collection("users").doc(email).set({
        name,
        email,
        message,
      });
      res.status(200).send("User feedback successfully uploaded");
    } catch (error) {
      res.status(500).send(error.toString());
    }
  });
});
