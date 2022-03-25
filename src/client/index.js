import "./style/resets.scss";
import "./style/base.scss";
import "./style/main.scss";

import { getToday } from "./js/dates";
import { formHandler, hideResult } from "./js/formHandler";
import { cancel } from './js/events';

let dateInputs = document.querySelectorAll('.day');
for(let i = 0; i < dateInputs.length; i++){
    dateInputs[i].setAttribute('min', getToday());
}

// Get send button
const btn = document.querySelector('.main__btn');

// Get sending button
const form = document.querySelector('.main__form');


cancel();



// Hide the result section
 hideResult();
// Handler the form submit
form.addEventListener('submit', formHandler);
