// Get dependencies
let express = require("express");
let path = require("path");
let http = require("http");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
let mongoose = require("mongoose");
require("dotenv").config();

// Import routing files
let index = require("./server/routes/app");
const trackRoutes = require("./server/routes/tracks");

let app = express(); // Create an instance of express

// Tell express to use the following parsers for POST data
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

app.use(logger("dev")); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, "dist/circle-tracks")));

// Mapping URL's to routing files
app.use("/", index);
app.use("/tracks", trackRoutes);

// Establish a connection to the Mongo database
mongoose.connect(
  "mongodb://localhost:27017/circle-tracks",
  // process.env.MONGO_URI,
  { useNewUrlParser: true },
  (err, res) => {
    if (err) {
      console.log("Connection failed: " + err);
    } else {
      console.log("Connected to database!");
    }
  }
);

// Tell express to map all other non-defined routes back to the index page
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/circle-tracks/index.html"));
});

// Define the port address and tell express to use this port
const port = process.env.PORT || "3000";
app.set("port", port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function () {
  console.log("API running on localhost: " + port);
});
