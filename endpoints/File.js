const express = require("express");
const router = express.Router();
const { app } = require("../firebase");
const { getStorage, ref, getDownloadURL } = require("firebase/storage");
const axios = require("axios");
const basePath = "Technologies";

router.get("/download/:filename", async (req, res) => {
    try {
        // Create a reference with an initial file path and name
        const storage = getStorage();
        const requestedFile = req.params.filename;
        const filePath = ref(storage, requestedFile);
        const downloadURL = await getDownloadURL(filePath);

        const response = await axios({
            url: downloadURL,
            method: "GET",
            responseType: "stream",
        });

        response.data.pipe(res);
    }
    catch (error) {
        res.send(error);
    }

});

module.exports = router;