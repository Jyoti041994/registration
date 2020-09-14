const express = require("express");
// to parse body from request
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

// used for cross origin use
const cors = require("cors");
const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoURI = "mongodb://127.0.0.1:27017";

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("Error occured", err));

const user = require("./routes/users");
app.use("/user", user);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
