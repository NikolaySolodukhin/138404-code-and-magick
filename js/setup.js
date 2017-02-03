'use strict';

var inputName = document.querySelector('.setup-user-name');

inputName.setAttribute('required', true);
inputName.setAttribute('maxLength', 50);
inputName.setAttribute('minLength', 2);
inputName.setAttribute('tabindex', 2);

var setup = document.querySelector('.setup');
var setupSubmit = setup.querySelector('.setup-submit');
var openPopupChar = document.querySelector('.setup-open');
var openPopupImg = openPopupChar.querySelector('.setup-open-icon');
var closePopupChar = setup.querySelector('.setup-close');

setup.setAttribute('role', 'dialog');

closePopupChar.setAttribute('tabindex', 3);
closePopupChar.setAttribute('role', 'button');

openPopupImg.setAttribute('tabindex', 1);
openPopupImg.setAttribute('role', 'button');

setupSubmit.setAttribute('tabindex', 4);

var wizardCoat = document.getElementById('wizard-coat');
var wizardEyes = document.getElementById('wizard-eyes');

var fireball = document.querySelector('.setup-fireball-wrap');


var KEY_CODE = {
  'enter': 13,
  'escape': 27
};

var isActivateEvent = function (evt) {
  return evt.keyCode && evt.keyCode === KEY_CODE.enter;
};

var setupKeydownHandler = function (evt) {
  if (evt.keyCode === KEY_CODE.escape) {
    setup.classList.add('invisible');
  }
};

var ariaPressedChange = function () {
  if (setup.classList.contains('invisible')) {
    setupSubmit.attributes['aria-pressed'] = false;
    openPopupImg.attributes['aria-pressed'] = false;
    closePopupChar.attributes['aria-pressed'] = false;
  } else {
    setupSubmit.attributes['aria-pressed'] = true;
    openPopupImg.attributes['aria-pressed'] = true;
    closePopupChar.attributes['aria-pressed'] = true;
  }
};

var showSetupElement = function () {
  setup.classList.remove('invisible');
  document.addEventListener('keydown', setupKeydownHandler);
  ariaPressedChange();
};

var hideSetupElement = function () {
  setup.classList.add('invisible');
  document.removeEventListener('keydown', setupKeydownHandler);
  ariaPressedChange();
};

openPopupChar.addEventListener('click', function () {
  showSetupElement();
});

closePopupChar.addEventListener('click', function () {
  hideSetupElement();
});

openPopupChar.addEventListener('keydown', function (evt) {
  if (isActivateEvent(evt)) {
    showSetupElement();
  }
});

closePopupChar.addEventListener('keydown', function (evt) {
  if (isActivateEvent(evt)) {
    hideSetupElement();
  }
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
