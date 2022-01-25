const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes");
require("dotenv").config();

const app = express();

app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", () => {
  console.log("Connected successfully");
});

app.use(Router);
const port = 3000;

app.listen(process.env.PORT || port, () => {
  console.log(`Server is running at port ${port}`);
});
