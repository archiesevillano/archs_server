const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: 'archie.sevillano29@gmail.com', //REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM
        pass: '136782070733' //REPLACE-WITH-YOUR-GENERATED-PASSWORD
    },
    tls: { rejectUnauthorized: false }
});

router.post("/", async (req, res) => {
    try {

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: 'archie.sevillano29@gmail.com', // sender address
            to: "aczionacs01@gmail.com", // list of receivers
            subject: "Test Email from Archs Portfolio", // Subject line
            html: "<b>This is a test email</b>", // html body
        });

        //send response result back to client
        res.send(info);
    }
    catch (err) {
        res.send(err);
        console.log(err);
    }
});

module.exports = router;

//https://stackoverflow.com/questions/72470777/nodemailer-response-535-5-7-8-username-and-password-not-accepted