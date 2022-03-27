/**
* @description Set up how to display the date 
* @param { string } - The date 
* @returns { string } - The formated date
*/
let dateFormatting = (data)=> {
    let arrayData = data.split('-');
    let setData = new Date(arrayData[0], arrayData[1]-1, arrayData[2]);
    let day = days[ setData.getDay() ];
    let month = months[ setData.getMonth() ];
    return `${day} ${arrayData[2]} ${month}`
}

// Array with day weeks 
let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
// Array with month names 
let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

/**
* @description Set up current data
* @returns { string } - Data format 2022-03-26
*/
let getToday = () => {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth()+1;
    let year = today.getFullYear();

    if( day < 10 ){
        day = '0' + day;
      } 
      if(month < 10){
        month = '0' + month;
      } 

    return `${year}-${month}-${day}`;

}

/**
* @description Calculates the number of days of travel  
* @param { string } - The start trip data  
* @returns { number } - Number of days
*/
let getNumberOfDays = (start) => {
    let rowData = start.split('-');
    const dateStart = new Date(rowData[0], rowData[1]-1, rowData[2]);
    const today = new Date();

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = dateStart.getTime() - today.getTime();

    // Calculating the number of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
}

/**
* @description Set up current day for the input
* @param {object} - Object with data
*/
let setUpDateInInput = () => {
let dateInputs = document.querySelectorAll('.day');
for(let i = 0; i < dateInputs.length; i++){
    dateInputs[i].setAttribute('min', getToday());
}
} 

export { dateFormatting, getNumberOfDays, getToday, setUpDateInInput }