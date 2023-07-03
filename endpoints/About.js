const express = require("express");
const router = express.Router();
const { app } = require("./../firebase");
const { getFirestore, doc, setDoc, addDoc, collection, getDocs } = require("firebase/firestore");
const db = getFirestore(app);
router.get("/", async (req, res) => {

    try {
        const dataCollection = [];

        const querySnapshot = await getDocs(collection(db, "about"));
        querySnapshot.forEach((doc) => {
            const dataWithId = doc.data();
            dataWithId["id"] = doc.id; //add id property
            dataCollection.push(dataWithId);
        });
        console.log(dataCollection);
        res.send(dataCollection);

    } catch (error) {
        console.log(error);
        res.send(error);
    }

});

module.exports = router;