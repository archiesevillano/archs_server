const express = require("express");
const router = express.Router();
const { app } = require("./../firebase");
const { getFirestore, doc, setDoc, addDoc, collection, getDocs } = require("firebase/firestore");
const db = getFirestore(app);
const basePath = "Technologies";

//create document in firestore
const createDoc = async request => {
    try {
        const { name, image, proficiency } = request.body;

        data.forEach(async item => {
            await addDoc(collection(db, "technologies"), {
                image: item?.image,
                name: item?.name,
                proficiency: item?.proficiency
            });
        });

        return "Successfully inserted";
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

// get document in firestore
const readDoc = async () => {
    try {
        const dataCollection = [];

        const querySnapshot = await getDocs(collection(db, "technologies"));
        querySnapshot.forEach((doc) => {
            const dataWithId = doc.data();
            dataWithId["id"] = doc.id; //add id property
            dataCollection.push(dataWithId);
        });
        console.log(dataCollection);

        return dataCollection;
    } catch (error) {
        console.log(error);
        return error
    }
}

router.get("/", async (req, res) => {
    res.send(await readDoc());
});

router.post("/new", async (req, res) => {
    res.send(await createDoc(req));
});

module.exports = router;