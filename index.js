const express = require("express");
const { config } = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 3001 || process.env.PORT

config();

//restrict specific host
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//import Routes
const projects = require("./endpoints/Projects");
const user = require("./endpoints/User");
const technologies = require("./endpoints/Technologies");

app.use("/projects", projects);
app.use("/user", user);
app.use("/technologies", technologies);

app.listen(PORT, () => {
    console.log("Server is now running...");
});