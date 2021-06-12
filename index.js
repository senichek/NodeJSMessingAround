// Add Express framework to the project;
const express = require("express");
const app = express();
console.log("Index.js has been started.");

app.get("/", (req, res) => {
    res.send("Hello World!!!");
})

app.get("/api", (req, res) => {
    res.send(["Course 1", "Course 2", "Course 3"]);
})

app.get("/api/courses/:courseID/:day/:time", (req, res) => {
    // Return ID of the course from URL
   // res.send(req.params);
    res.send(req.params.courseID);
})

app.get("/api/posts/:year/:month", (req, res) => {
    // Read query string params;
    // Accessing /api/posts/2021/12?sortBy=name will return the param which is "name";
    res.send(req.query);
})

// If the environment variable with port number is set we will use it, otherwise 
// we will use port 3000;
const port = process.env.port || 3000;
app.listen(port, function () {
    console.log(`Listen port ${port}`);
})