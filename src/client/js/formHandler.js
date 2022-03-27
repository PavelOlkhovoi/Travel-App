import { cardTemplate, headOfCard } from './factory-html'
import { dateFormatting, getNumberOfDays} from './dates'
import notImg from '../media/img/notcity.jpg'

/**
* @description Form Handler evokes validate function, get keys from the server-side, fetch API functions, display the travel card
* @param {event} submit
*/
let formHandler = (event) => {
    event.preventDefault();
    let inputs = document.querySelectorAll('.main__input');
    let fieldsValue = validatePattern(inputs);
    let weather, geonames, pixabay;
    let card = cardTemplate(fieldsValue.city);

    if(fieldsValue){
        getKey()
        .then(res => {
            weather = res.weather;
            geonames = res.geonames;
            pixabay = res.pixabay;
        })
        .then(keys => fetchCityName(fieldsValue.city, geonames))
        .then(res => {
            headOfCard(card, fieldsValue, res);
            return res; 
        })
        .then(res => {
            let {lat, lng} = res;
            return fetchPredictWeather(lat, lng, weather)
        })
        .then(res => {
            setupWeatherReader(card, res, fieldsValue);
            return fetchFoto(fieldsValue.city, pixabay)
        })
        .then(res => {

            showImg(res, card);
            document.querySelector('.reply__directions').insertAdjacentElement('afterend', card);

            clearForm();
            showResult();
            return res;
        })
        .catch(err => console.log(err));
    }
}

/**
* @description Clear old text in inputs
*/
let clearForm = () => {
    let inputs = document.querySelectorAll('.main__input');
    for(let i = 0; i < inputs.length; i++){
        inputs[i].value = '';
    }
}

/**
* @description Print the default foto or foto from API
* @param {link, html} - link on image / the travel card 
* @returns {boolean}
*/
let showImg = (res, card) => {
    let image = card.querySelector('.card__image');
    if(!res){
        image.src = notImg;
        return false;
    }else {
        image.src = res;
        return true;
    }
}

/**
* @description Set up rules on how to display weather data and check the type of forecast
* @param {html, object, object} - the travel card / wether data / start and end the trip 
*/
let setupWeatherReader = (card, res, fieldsValue) => {
    let textFields = {
        datetime: 'Valid date',
        wind_spd: 'Wind speed',
        temp: 'Temperature',
        pop: 'Precipitation',
        clouds: 'Cloud coverage'
    };

    let colWeather = card.querySelector('.card__weather');

    for(let i = 0; i < res.length; i++){
        let dayDifference = getNumberOfDays(fieldsValue.start);
        if(dayDifference < 7 && i < 7){
            let ul = document.createElement('ul');
            colWeather.insertAdjacentElement('beforeend', ul);
            typeOfWeather(res[i], ul, textFields);
        }else {
        }
        if(dayDifference > 6 && i > 8){
            let ul = document.createElement('ul');
            colWeather.insertAdjacentElement('beforeend', ul);
            typeOfWeather(res[i], ul, textFields);
        }
    }
}

/**
* @description Set up how to display weather messers like wind speed, temperature, clouds...
* @param {object, html, object} - wether data / weather list ul / the pattern that displays weather fields
*/
let typeOfWeather = (resArr, ul, textFields) => {
    for(let key in resArr){
        let li = document.createElement('li');

        if(textFields[key]){
            
            if(key == 'wind_spd'){
                renderLi(ul, li, `${textFields[key]}: ${resArr[key]} m/s`);
            }

            if(key == 'temp'){
                renderLi(ul, li, `${textFields[key]}: ${resArr[key]} Celcius`);
            }

            if(key == 'pop' || key == 'clouds') {
                renderLi(ul, li, `${textFields[key]}: ${resArr[key]}%`);
            }

            if(key == 'datetime') {
                renderLi(ul, li, dateFormatting(resArr[key]), 'afterbegin');
            }
            
        }
    }
}

/**
* @description Display items in the weather list
* @param {html, html, text, text} - ul / li / pattern how to display weather fields
*/
let renderLi = (ul, li, text, place = 'beforeend') => {
    li.innerHTML = text;
    ul.insertAdjacentElement(place, li);
}

/**
* @description Validate date. Save data in object or false if the data is wrong, add class 'error' 
* @param {html} - All inputs
* @returns {boolean or object} - false or object
*/
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
        if(pattern.test(value)){
            result[inputValidateName] = value;
            removeError(input);
        }else {
            addError(input);
            status = false;
        }
    }

    return status ? result : status;
}

/**
* @description Fetch the data about the city from Geonames API
* @param {string, string} - City / API key
* @returns {object} - The object that contains data about the city
*/
let fetchCityName = async (name, geonames) => {

    let response = await fetch(`http://api.geonames.org/searchJSON?q=${name}&maxRows=1&username=${geonames}`);
        let data = await response.json();
        if(data.totalResultsCount !== 0){
            return data.geonames[0];
        }else {
            addError(document.querySelector('.city'));
            throw new Error("City not found");
        }
}

/**
* @description Fetch the weather from Weatherbit API
* @param {string, string, string} - latitude / longitude / Key for API 
* @returns {object} - The object that contains weather data for 16 days
*/
let fetchPredictWeather = async (lat, lon, key) => {
    try{
        let response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${key}`);
        let data = await response.json();
        return data.data;
    }catch(err) {
        console.log(error);
    }
}
/**
* @description Fetch city photo from Pixabay API
* @param {string, string} - The city name / Key for API 
* @returns {link} - link to the foto or error
*/
let fetchFoto = async(cityName, key) => {
    try{
        let response = await fetch(`https://pixabay.com/api/?key=${key}&q=${cityName}&image_type=photo`);
        let data = await response.json();
        let link = data.hits[0].notImg;

        return data.hits[0].webformatURL;
    }catch(err){
        return null
    }
}

/**
* @description Add the class "err" and display a message in a placeholder
* @param {html} - The input that contains the travel name
*/
let addError = (input) => {
    input.value += ' Wrong Name';
    input.classList.add('err');
}

/**
* @description Remove the class "err"
* @param {html} - The input that contains the travel name
*/
let removeError = (input) => {
    input.classList.remove('err');
}

/**
* @description The get request to the internal server to get the API key 
* @returns {object} Key - Custom object that will send on server
*/
async function getKey(){
    const response = await fetch('http://localhost:8081/key', {
        credentials: "same-origin"
    });
    try{
        const data = await response.json();
        return data
    }catch(error){
        console.log(error);
    }
}

/**
* @description Hide the results block 
*/
let hideResult = ()=> {
    document.querySelector('.reply').classList.remove('active');
}

/**
* @description Show the results block 
*/
let showResult = () => {
    document.querySelector('.reply').classList.add('active');
}


export { formHandler, getKey, hideResult}