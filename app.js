/* Global Variables */

let allData = {};

// Code for apiKey and baseURL.

const apiKey = "&appid=2007188b5284d5745bf8b385a92fd005&units=imperial";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
let zip = document.getElementById("zip");
let userInput = document.getElementById("feelings");


// Worked around by using the template literals to make full URL in "fetch" field.

let totalURL = `${baseURL}+${zip.value}+${apiKey}`;

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// Async function to post data.

const postWeatherData = async (url = "", data = {}) => {
	console.log(data);
		const response = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		try {
			const newData = await response.json();
			console.log(newData);
			return newData;

		} catch(error) {
			console.log("error", error);
		}
}

// Async function to get data.

const getWeatherData = async (url = "") => {
	const request = await fetch(`${baseURL}${zip.value}${apiKey}`);
	try {
		const allData = await request.json();
		return allData;

	} catch(error) {
		console.log("error", error);
	}
};

// Function to update UI with data.

	const updateUI = async () => {
		const request = await fetch('/all');
		console.log('UpdateUI request', request);
		try{
			const allData = await request.json()
			console.log(allData)
			document.getElementById('temp').innerHTML = `Temp: ${Math.round(allData.temperature)} F`;
			document.getElementById('date').innerHTML = allData.date;
			document.getElementById('content').innerHTML = `Feelings: ${allData.content}`;
		}
		catch(error) {
			console.log("error", error);
		}
	}

// Function to show time.

function displayTime() {

	let date = new Date();
	let time = document.getElementById("time");
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();

	time.textContent = `${hours}:${addZeros(minutes)}:${addZeros(seconds)}`;

}

function addZeros(n) {
	return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

// Displays real-time clock.

setInterval(displayTime);

// Function to set background image based on time of day.

function setBackground() {
	let date = new Date();
	let hours = date.getHours();
	let app = document.getElementById('app');
	if (hours < 12) {
		//morning
		app.style.backgroundImage = "url('day4.jpg')";
	} else if (hours < 18) {
		//afternoon
		app.style.backgroundImage = "url('noon1.jpg')";
	} else {
		//night
		app.style.backgroundImage = "url('night4.jpg')";
	}
}

setBackground()

// Complete promise chain to get, post, and updateUI.

function getPost() {
	
	getWeatherData(`${baseURL}${zip.value}${apiKey}`)
	.then(function(data){
		console.log(data);
		postWeatherData('/add', {
			temperature : data.main.temp,
			date : newDate,
			userContent : userInput.value, 
		})
	})
	.then(function (){
		updateUI();
	})
}

// Event for app to function on-click.

document.getElementById("submit").addEventListener("click", getPost);
