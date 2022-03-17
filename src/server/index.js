const dotenv = require('dotenv');
const path = require('path');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
// Get root folder
const rootPath = path.resolve('../../');
// Dotenv Configuration
const result = dotenv.config({ path: path.resolve(rootPath, '.env')})
// Path of the main page
const distPath = path.resolve(rootPath, 'dist', 'index.html');

// Start up an instance of app
const app = express()

// Cors for cross origin allowance
app.use(cors())
//Here we are configuring express to use body-parser as middle-ware
app.use(bodyParser.json())
// To use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))
// Initialize the main project folder
app.use(express.static(path.resolve(rootPath, 'dist')))

// Route to get index.html
app.get('/', function (req, res) {
    res.sendFile(distPath)
})
// Object with keys for API
const keyAPI = {
  weather: process.env.WEATHER_KEY,
  geonames: process.env.GEONAMES,
  pixabay: process.env.PIXABAY_KEY
}
// Route to get the API keys
app.get('/key', (req, res)=> {
    res.json(keyAPI);
})

// Designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
