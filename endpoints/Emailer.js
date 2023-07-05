const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { MAIL_ACC, CLIENT_ID, REFRESH_TOKEN, ACCESS_TOKEN, CLIENT_SECRET } = process.env;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: MAIL_ACC,
        pass: 'mpchpzbcreeelgbr'
    },
    tls: {
        rejectUnauthorized: false
    }
});

const send = async () => {
    const result = await transporter.sendMail({
        from: MAIL_ACC,
        to: "archie.sevillano29@gmail.com",
        subject: 'Hello World',
        html: '<h1 style="background: red; color: white">This is a test</h1>'
    });

    const info = await JSON.stringify(result, null, 4);
    console.log(info);
    return info;
}

router.post("/", async (req, res) => {
    try {
        //data to send
        const { receiver, message, subject } = req.body;

        console.log([receiver, message, subject]);
        //start sending email
        const data = await send();
        res.send(data);
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
});

module.exports = router;