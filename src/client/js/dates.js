let dateFormatting = (data)=> {
    let arrayData = data.split('-');
    let setData = new Date(arrayData[0], arrayData[1]-1, arrayData[2]);
    let day = days[ setData.getDay() ];
    let month = months[ setData.getMonth() ];
    return `${day} ${arrayData[2]} ${month}`
}

let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

let getNumberOfDays = (start) => {
    let rowData = start.split('-');
    const dateStart = new Date(rowData[0], rowData[1]-1, rowData[2]);
    const today = new Date();

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = dateStart.getTime() - today.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
}

export { dateFormatting, getNumberOfDays }