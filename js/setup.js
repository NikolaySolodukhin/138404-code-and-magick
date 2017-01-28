'use strict';
var openPopupChar = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var closePopupChar = setup.querySelector('.setup-close');

var wizardCoat = document.getElementById('wizard-coat');
var wizardEyes = document.getElementById('wizard-eyes');

var fireball = document.querySelector('.setup-fireball-wrap');

openPopupChar.addEventListener('click', function () {
  setup.classList.remove('invisible');
});

closePopupChar.addEventListener('click', function () {
  setup.classList.add('invisible');
});

var wizardCoatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var wizardEyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var fireballWrapColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

function randomArrElem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = randomArrElem(wizardCoatColors);
});

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = randomArrElem(wizardEyesColors);
});

fireball.addEventListener('click', function () {
  fireball.style.backgroundColor = randomArrElem(fireballWrapColors);
});
