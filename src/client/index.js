import "./style/resets.scss";
import "./style/base.scss";
import "./style/main.scss";
import "./style/footer.scss";

import { setCurrenDay } from "./js/dates"
import { formHandler } from "./js/formHandler";

// Get send button
const btn = document.querySelector('.main__btn');

// Get sending button
const form = document.querySelector('.main__form');


// Hide the result section
// hideResult();
// Handler the form submit
form.addEventListener('submit', formHandler);