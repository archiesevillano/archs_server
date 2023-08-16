const express = require("express");
const router = express.Router();
const { app } = require("./../firebase");
const { getFirestore, doc, getDocs, collection } = require("firebase/firestore");

router.get("/", async (req, res) => {
    try {
        const db = getFirestore(app);
        const dataCollection = [];

        const querySnapshot = await getDocs(collection(db, "projects"));
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