// Needed for user input validation;
const Joi = require("joi");

var courseID = 4;

const customValidator = require("./customValidator");

// Add Express framework to the project;
const express = require("express");
const app = express();

// Enable parsing of Json objects in the body of the POST requests;
app.use(express.json());

console.log("Index.js has been started.");

const courses = [
    { id: 1, name: "French" },
    { id: 2, name: "Math" },
    { id: 3, name: "Driving" }
];

app.get("/", (req, res) => {
    res.send("Hello World!!!");
})

app.get("/api", (req, res) => {
    res.send(["Doc#1", "Doc#2", "Doc#3"]);
})

app.get("/api/courses/:courseID/:day/:time", (req, res) => {
    // Return ID of the course from URL
    // res.send(req.params);
    res.send(req.params.courseID);
    // we can return res.send(req.params.day) or req.params.time
})

app.get("/courses", (req, res) => {
    res.send(courses);
})

app.get("/courses/:courseID/", (req, res) => {
    const course = courses.find(crs => {
        return crs.id === parseInt(req.params.courseID);
    })

    if (!course) {
        res.status(404).send(`The course with the id ${req.params.courseID} not found;`);
    } else {
        res.send(course);
    }

    /* const course = courses.filter(function(crs) {
        return crs.id === parseInt(req.params.courseID);
    }) */
})

app.get("/api/posts/:year/:month", (req, res) => {
    // Read query string params;
    // Accessing /api/posts/2021/12?sortBy=name will return the param which is "name";
    res.send(req.query);
})

app.post("/courses", (req, res) => {
    // it's the same as const result.error after executing customValidator.validateCourse(course)
    const { error } = customValidator.validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const course = {
        id: courseID++,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
})

app.put("/courses/:courseID", (req, res) => {
    // Update the course;
    const course = courses.find(crs => {
        return crs.id === parseInt(req.params.courseID);
    })

    const { error } = customValidator.validateCourse(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Updating the name of the course;
    course.name = req.body.name;
    res.send(course);
})

app.delete("/courses/:courseID/", (req, res) => {
    const course = courses.find(crs => {
        return crs.id === parseInt(req.params.courseID);
    })

    if (!course) {
        return res.status(404).send(`The course with the id ${req.params.courseID} not found;`);
    }

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})

// If the environment variable with port number is set we will use it, otherwise 
// we will use port 3000;
const port = process.env.port || 3000;
app.listen(port, function () {
    console.log(`Listen port ${port}`);
})