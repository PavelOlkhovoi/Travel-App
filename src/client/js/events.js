
/**
* @description EventListener by button "Cancel" in a travel card
*/
let cancel = () => {
    document.querySelector('.reply').addEventListener('click', removeCard);
}

/**
* @description Delete a trip Card by click
* @param {event} - Event click
*/
let removeCard = (event) => {
    let cancelBtn = event.target;
    let card = document.getElementById(cancelBtn.dataset.city);
    card.remove();
}
export { cancel }