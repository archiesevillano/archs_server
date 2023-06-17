const express = require("express");
const router = express.Router();
const { app } = require("./../firebase");
const { getFirestore, doc, setDoc } = require("firebase/firestore");
const db = getFirestore(app);

router.get("/", (req, res) => {
    res.send({ data: "Project List" });
});

module.exports = router;