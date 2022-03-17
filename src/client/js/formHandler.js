/**
* @description Form Handler evokes validate and fetch API functions 
* @param {event} Click - Should be a button 
*/
let formHandler = (event) => {
    event.preventDefault();
    let inputs = document.querySelectorAll('.main__input');
    let fieldsValue = validatePattern(inputs);
    let weather, geonames, pixabay;
    if(fieldsValue){
        console.log('We can start fetching');
        getKey()
        .then(res => {
            weather = res.weather;
            geonames = res.geonames;
            pixabay = res.pixabay;
            console.log(weather, geonames, pixabay)
        })
        .then(keys => fetchCityName(fieldsValue.city, geonames))
        .then(res => {
            fieldsValue.city = res.toponymName;
            return res; 
        })
        .then(res => {
            let {lat, lng} = res;
            return fetchPredictWeather(lat, lng, weather)
        })
        .then(res => {
           console.log(res);
           return fetchFoto(fieldsValue.city, pixabay)
        })
        .then(res => console.log(res))
        .catch(err=> console.log('СДержанный катч'));
    }
    
}

let validatePattern = (inputs) => {
    let patterns = {
        city: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
        start: /[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]/,
        finish: /[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]/,
    }

    let result = {}

    let status = true;

    for(let i = 0; i < inputs.length; i++){
        let input = inputs[i];
        let inputValidateName = input.dataset.validation
        let value = input.value.trim();
        let pattern = patterns[inputValidateName];
        console.log(value);
        if(pattern.test(value)){
            console.log('Ok');
            result[inputValidateName] = value;
        }else {
            console.log('False');
            status = false;
        }
    }


    return status ? result : status;
}

let fetchCityName = async (name, geonames) => {

    let response = await fetch(`http://api.geonames.org/searchJSON?q=${name}&maxRows=1&username=${geonames}`);
        let data = await response.json();
        if(data.totalResultsCount !== 0){
            return data.geonames[0];
        }else {
            console.log('City not found');
            throw new Error("Упсиииииииииииии боже мой!");
            // renderError('City not found');
        }
}

let fetchPredictWeather = async (lat, lon, key) => {
    try{
        let response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${key}`);
        let data = await response.json();
        return data.data;
    }catch(err) {
        console.log(error);
    }
}

let fetchFoto = async(cityName, key) => {
    let response = await fetch(`https://pixabay.com/api/?key=${key}&q=${cityName}&image_type=photo`);
    let data = await response.json();
    return data.hits[0].webformatURL;
}


/**
* @description Form validate 
* @param {string} url - The link that should be evaluated
* @returns {boolean} - Tru / false 
*/
function formValidate(linkInput){
    // Simple regexp to check the first part of the link
    let test = /^https{0,1}:\/\/+\w*\.+.*/.test(linkInput);
    return test;
}
/**
* @description The get request to the internal server to get the API key 
* @returns {object} Key - Custom object that will send on server
*/
async function getKey(){
    const response = await fetch('http://localhost:8081/key');
    const data = await response.json();

    return data
}

/**
* @description Hide the results block 
*/
function hideResult(){
    document.querySelector('.reply').classList.remove('active');
}

/**
* @description Show the results block 
*/
function showResult(){
    document.querySelector('.reply').classList.add('active');
}

/**
* @description Send data from API to APP
* @param {object} - Object with data
*/
function renderData(resultObj){
    for (let key in resultObj){
        document.getElementById(key).innerHTML = `${key}: <em>${resultObj[key]}</em>`;
    }
}

export { formHandler, formValidate, hideResult }