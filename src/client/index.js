import "./style/resets.scss";
import "./style/base.scss";
import "./style/main.scss";

import { setUpDateInInput } from "./js/dates";
import { formHandler, hideResult } from "./js/formHandler";
import { cancel } from './js/events';


// Get send button
const btn = document.querySelector('.main__btn');

// Get sending button
const form = document.querySelector('.main__form');

setUpDateInInput();

cancel();



// Hide the result section
 hideResult();
// Handler the form submit
form.addEventListener('submit', formHandler);
form.addEventListener('input', ()=> {
    document.querySelector('.city').classList.remove('err');
});
