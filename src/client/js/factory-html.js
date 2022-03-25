import { dateFormatting } from './dates'

// TODO: refactor add Class
let cardTemplate = (city) => {
    let wrapper = document.createElement('div');
    wrapper.classList.add('reply__card', 'card');

    wrapper.setAttribute('id', city);

    let container = document.createElement('div');
    container.classList.add('card__container');

    let colFoto = document.createElement('div');
    colFoto.classList.add('card__foto');

    let imageWrapper = document.createElement('div');
    imageWrapper.classList.add('card__foto-wrap');

    let image = document.createElement('img');
    image.classList.add('card__image');

    wrapper.insertAdjacentElement('afterbegin', container);
    container.insertAdjacentElement('afterbegin', colFoto);
    colFoto.insertAdjacentElement('afterbegin', imageWrapper);
    imageWrapper.insertAdjacentElement('afterbegin', image)


    // TODO: Sectiont HEAD 
    let colText = document.createElement('div');
    colText.classList.add('card__info'),
    container.insertAdjacentElement('beforeend', colText);

    let title = document.createElement('h2');
    title.classList.add('card__title');

    colText.insertAdjacentElement('afterbegin', title);

    let startOfTrip = document.createElement('span');
    startOfTrip.classList.add('card__departing');
    
    let endOfTrip = document.createElement('span');
    endOfTrip.classList.add('card__last-day');

    colText.insertAdjacentElement('beforeend', startOfTrip);
    colText.insertAdjacentElement('beforeend', endOfTrip);

    let cancel = document.createElement('div');
    cancel.classList.add('card__cancel');
    cancel.innerHTML = `Cancel`;

    cancel.setAttribute('data-city', city);

    colText.insertAdjacentElement('beforeend', cancel);


    let colWeather = document.createElement('div');
    colWeather.classList.add('card__weather');

    container.insertAdjacentElement('beforeend', colWeather);


    return wrapper;
}

let headOfCard = (card, fieldsValue, res) => {
    let title = card.querySelector('.card__title');
    let start = card.querySelector('.card__departing');
    let finish = card.querySelector('.card__last-day');
    fieldsValue.city = res.toponymName;
    title.innerHTML = fieldsValue.city;
    start.innerHTML = `<em>Start of the trip:</em> ${ dateFormatting(fieldsValue.start) } `
    finish.innerHTML = `<em>Finish of the trip:</em> ${ dateFormatting(fieldsValue.finish)}`;
}


export { cardTemplate, headOfCard }