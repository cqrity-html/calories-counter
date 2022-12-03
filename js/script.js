'use strict';

const inputAge = document.querySelector('#age');
const inputHeight = document.querySelector('#height');
const inputWeight = document.querySelector('#weight');

const buttonSubmit = document.querySelector('.form__submit-button');
const buttonReset = document.querySelector('.form__reset-button');

const counterForm = document.querySelector('.counter__form');
const counterResult = document.querySelector('.counter__result')

const caloriesNorm = document.querySelector('#calories-norm');
const caloriesMinimal = document.querySelector('#calories-minimal');
const caloriesMaximal = document.querySelector('#calories-maximal');

const activityCoefficients = {
    min: 1.2,
    low: 1.375,
    medium: 1.55,
    high: 1.725,
    max: 1.9,
};

const showButtons = function () {
    if (inputAge.value !== '' && inputHeight.value !== '' && inputWeight.value !== '') {
        buttonSubmit.disabled = false;
    }
    if (inputAge.value !== '' || inputHeight.value !== '' || inputWeight.value !== '') {
        buttonReset.disabled = false;
    }
};

const showResult = function (evt) {
    evt.preventDefault();
    const activities = Array.from(document.querySelectorAll('[name^=activity]'));
    const currentActivilityLevel = activities.find(button => button.checked === true);
    const activityCoefficient = activityCoefficients[currentActivilityLevel.value];
    const normMen = ((10 * +inputWeight.value) + (6, 25 * +inputHeight.value) - (5 * +inputAge.value) + 5) * activityCoefficient;
    const normWomen = ((10 * +inputWeight.value) + (6, 25 * +inputHeight.value) - (5 * +inputAge.value) - 161) * activityCoefficient;
    const isMale = document.querySelector('#gender-male').checked === true;
    caloriesNorm.textContent = isMale ? normMen.toFixed(0) : normWomen.toFixed(0);
    caloriesMaximal.textContent = isMale ? (normMen * 1.15).toFixed(0) : (normWomen * 1.15).toFixed(0);
    caloriesMinimal.textContent = isMale ? (normMen * 0.85).toFixed(0) : (normWomen * 0.85).toFixed(0);
    counterResult.classList.remove('counter__result--hidden');
};

const resetForm = function () {
    document.querySelector('#gender-male').checked = true;
    document.querySelector('#activity-minimal').checked = true;
    inputAge.value = inputHeight.value = inputWeight.value = '';
    buttonSubmit.disabled = true;
    buttonReset.disabled = true;
    counterResult.classList.add('counter__result--hidden');
};

counterForm.addEventListener('input', showButtons);
buttonReset.addEventListener('click', resetForm);
buttonSubmit.addEventListener('click', showResult);
