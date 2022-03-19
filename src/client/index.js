import "./style/resets.scss";
import "./style/base.scss";
import "./style/main.scss";
import "./style/footer.scss";

import { getToday } from "./js/dates"
import { formHandler } from "./js/formHandler";

let dateInputs = document.querySelectorAll('.day');
for(let i = 0; i < dateInputs.length; i++){
    dateInputs[i].setAttribute('min', getToday());
}

// Get send button
const btn = document.querySelector('.main__btn');

// Get sending button
const form = document.querySelector('.main__form');


// Hide the result section
// hideResult();
// Handler the form submit
form.addEventListener('submit', formHandler);