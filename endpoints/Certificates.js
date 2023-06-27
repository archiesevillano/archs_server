const express = require("express");
const router = express.Router();
const { app } = require("./../firebase");
const { doc, setDoc, getDocs, collection, getFirestore } = require("firebase/firestore");

router.get("/", async (req, res) => {
    try {
        const db = getFirestore(app);
        const dataCollection = [];

        const querySnapshot = await getDocs(collection(db, "certificates"));
        querySnapshot.forEach((doc) => {
            const dataWithId = doc.data();
            dataWithId["id"] = doc.id; //add id property
            dataCollection.push(dataWithId);
        });
        console.log(dataCollection);
        res.send(dataCollection);
    } catch (error) {
        // error response
        res.send(error);
        console.log(error);
    }
});

module.exports = router;