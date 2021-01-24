const express = require("express");
const SetUpDB = require('./utils/db/init');

const app = express();
const port = process.env.PORT || "8000";

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.status(200).send("Welcome to Sportify");
});

SetUpDB()