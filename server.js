// server.js file to set up node and express environment & capture all project data.

// Code for projectData.

projectData = {};

// Code to set up & run Express for server and API routes.

const express = require("express");
const app = express();

// Code for app to use body-parser and convert to JSON data.

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Code for setting up and utilizing cors.

const cors = require('cors');
app.use(cors());

// Code to utilize website as the main folder.

app.use(express.static("website"));

// Code to set up the server environment.

const port = process.env.PORT || 8080;

const server = app.listen(port, ()=> {
	console.log(`running on localhost ${port}`)
});

// Initialize all route with a callback function

app.get("/all", function (req, res) {
	res.send(projectData);
});

// Callback function to complete GET '/all'

// Post Route

app.post("/add", function (req, res) {
	console.log(req.body)
	newEntry = {
		temperature: req.body.temperature,
		date: req.body.date,
		content: req.body.userContent,
	}
	projectData = newEntry;
	res.send(projectData);
	console.log(projectData);
});

// Post weather data.

