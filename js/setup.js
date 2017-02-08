'use strict';

var setup = document.querySelector('.setup');
var openPopupChar = document.querySelector('.setup-open');
var closePopupChar = setup.querySelector('.setup-close');
var inputName = setup.querySelector('.setup-user-name');

inputName.setAttribute('required', true);
inputName.setAttribute('maxLength', 50);
inputName.setAttribute('minLength', 2);

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

var ariaPressedChange = function (element) {
  var pressed = (element.getAttribute('aria-pressed') === 'true');
  if (!pressed) {
    element.setAttribute('aria-pressed', !pressed);
  }
};

var showSetupElement = function () {
  setup.classList.remove('invisible');
  document.addEventListener('keydown', setupKeydownHandler);
};

var hideSetupElement = function () {
  setup.classList.add('invisible');
  document.removeEventListener('keydown', setupKeydownHandler);
};

openPopupChar.addEventListener('click', function () {
  showSetupElement();
  ariaPressedChange(openPopupChar);
});

closePopupChar.addEventListener('click', function () {
  hideSetupElement();
  ariaPressedChange(closePopupChar);
});

openPopupChar.addEventListener('keydown', function (evt) {
  if (isActivateEvent(evt)) {
    showSetupElement();
    ariaPressedChange(openPopupChar);
  }
});

closePopupChar.addEventListener('keydown', function (evt) {
  if (isActivateEvent(evt)) {
    hideSetupElement();
    ariaPressedChange(closePopupChar);
  }
});

window.colorizeElement(document.getElementById('wizard-coat'),
    ['#ee4830',
      '#30a8ee',
      '#5ce6c0',
      '#e848d5',
      '#e6e848',
      '#e6e848'],
    'fill'
);

window.colorizeElement(document.getElementById('wizard-eyes'),
    ['black',
      'red',
      'blue',
      'yellow',
      'green'],
    'fill'
);

window.colorizeElement(document.querySelector('.setup-fireball-wrap'),
    ['#ee4830',
      '#30a8ee',
      '#5ce6c0',
      '#e848d5',
      '#e6e848'],
    'backgroundColor'
);
