// app.js

const express = require("express");
const connectDB = require("./config/db");
var cors = require("cors");
const path = require("path");

// routes
const books = require("./routes/api/books");

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

// app.get("/", (req, res) => res.send("Hello world!"));

if (process.env.NODE_ENV === "production") {
  // Import the my-app build folder
  app.use(express.static("my-app/build"));

  // Ensure that the routes defined with React Router are working once the application has been deployed.
  // app.get("*", function (request, response) {
  //   response.sendFile("./my-app/build", "index.html");
  // });
  app.get("/", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./my-app/build", "index.html"));
  });
}

// use Routes
app.use("/api/books", books);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
