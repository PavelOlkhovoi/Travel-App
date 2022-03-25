let cancel = () => {
    document.querySelector('.reply').addEventListener('click', removeCard);
}

let removeCard = (event) => {
    let cancelBtn = event.target;
    let card = document.getElementById(cancelBtn.dataset.city);
    card.remove();
}
export { cancel }