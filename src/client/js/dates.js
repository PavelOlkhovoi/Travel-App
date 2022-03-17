let setCurrenDay = ()=> {
    let startData = document.getElementById('start-data');
    startData.value = Date();
    console.log(startData);
}

export { setCurrenDay }