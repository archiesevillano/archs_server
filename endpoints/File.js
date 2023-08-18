const express = require("express");
const router = express.Router();
const { app } = require("../firebase");
const { getStorage, ref, getDownloadURL } = require("firebase/storage");
const axios = require("axios");

// Alternative Download Link for CV
router.get("/download/alternative-download-cv", async (req, res) => {
    try {

        //get fileid from GoogleDrive File Share Link between 'd' and 'view' in url e.g (https://drive.google.com/file/d/[FILE ID]/view?usp=sharing)
        //paste File ID next to "id=" in your final link which is "https://drive.google.com/uc?export=download&id="
        const gDriveFile = "https://drive.google.com/uc?export=download&id=1tLDU0Qc8gePDphKUZkJTCfhv6_33yRma";

        const response = await axios({
            url: gDriveFile,
            method: "GET",
            responseType: "stream",
        });

        response.data.pipe(res);

    }
    catch (error) {
        res.send(error);
        console.log(error);
    }

});

// Direct Download Link for CV
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
        console.log(error);
    }

});

module.exports = router;