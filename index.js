const express = require("express");
const { config } = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 3001 || process.env.PORT

config();

//restrict specific host
app.use(cors({
    origin: process.env.CLIENT
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//import Routes
const projects = require("./endpoints/Projects");
const user = require("./endpoints/User");
const technologies = require("./endpoints/Technologies");
const file = require("./endpoints/File");
const services = require("./endpoints/Services");
const certificates = require("./endpoints/Certificates");
const email = require("./endpoints/Emailer");
const about = require("./endpoints/About");

app.use("/projects", projects);
app.use("/technologies", technologies);
app.use("/file", file);
app.use("/services", services);
app.use("/certificates", certificates);
app.use("/send-email", email);
app.use("/about", about);

app.listen(PORT, () => {
    console.log("Server is now running...");
});