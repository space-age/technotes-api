require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger, logEvents } = require("./middleware/logger");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");

// PORT to assign for the server
const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV);

// connects to the mongo database
connectDB();

app.use(logger);

app.use(cors(corsOptions));

//will allow app receive and parse that JSON data
app.use(express.json());

app.use(cookieParser());

//no need to add path for css file for when using public
app.use("/", express.static(path.join(__dirname, "public")));
//app.use(express.static("public")); //does the same as above but with less information

app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/notes", require("./routes/noteRoutes"));

// '*' means all
app.all("*", (req, res) => {
  res.status(404);
  //check if request is of html
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } //checks if request is of json
  else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } // checks anything else
  else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

/**
 * adds a one time listener to the connection for open
 * then sets the app to start listening for requests from PORT
 */
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

/**
 * adds a listener for when an on error from mongoose connection occurs
 * then will log the errors to the file mongoErrLog.log
 */
mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
