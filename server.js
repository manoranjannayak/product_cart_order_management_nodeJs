const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const routes = require("./routes/index");
const EventEmitter = require("events");
var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

const eventEmitter = new EventEmitter();
app.set("eventEmitter", eventEmitter);
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(jsonParser);
app.use(urlencodedParser);
//routes
app.use("/", routes);

//database connection
mongoose.connect(
  "mongodb://localhost:27017/pco_management",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  err => {
    if (err) {
      console.log("connection error");
    }
  }
);

app.listen(port, () => {
  console.log("server listen on ", port);
});
