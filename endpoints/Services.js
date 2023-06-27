const express = require("express");
const router = express.Router();
const { app } = require("./../firebase");
const { doc, setDoc, getDoc, collection, getFirestore } = require("firebase/firestore");

router.get("/", async (req, res) => {
    const db = getFirestore(app);
    const docRef = doc(db, "Services", "data");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        res.send(docSnap.data());
    } else {
        // docSnap.data() will be undefined in this case
        console.log(error);
        res.send(error);
    }
});

module.exports = router;