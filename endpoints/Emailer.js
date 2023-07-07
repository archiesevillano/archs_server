const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { MAIL_ACC, TO_EMAIL } = process.env;

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

const send = async (email, message) => {
    const result = await transporter.sendMail({
        from: "ARCHS",
        to: TO_EMAIL,
        subject: "[Auto-generated message]",
        html: message
    });

    const info = await JSON.stringify(result, null, 4);
    console.log(info);
    return info;
}

router.post("/", async (req, res) => {
    try {
        //data to send
        const { email, message } = req.body;

        //start sending email
        const data = await send(email, message);
        res.send(data);
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
});

module.exports = router;