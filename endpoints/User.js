const express = require("express");
const router = express.Router();

const auth = (req, res, next) => {
    if (req.query.name === "archie") {
        next();
    }
    else {
        res.send({ data: "Log in unsuccessful" });
    }
}

router.get("/", auth, (req, res) => {
    res.send({ data: "Logged in" });
})

module.exports = router;