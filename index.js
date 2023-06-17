const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3001 || process.env.PORT

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//import Routes
const projects = require("./endpoints/Projects");
const user = require("./endpoints/User");

app.use("/projects", projects);
app.use("/user", user);

app.listen(PORT, () => {
    console.log("Server is now running...");
})