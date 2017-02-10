'use strict';

window.setup = (function () {

  var KEY_CODE = {
    'enter': 13
  };

  return {
    ariaPressedChange: function (element) {
      var pressed = (element.getAttribute('aria-pressed') === 'true');
      if (!pressed) {
        element.setAttribute('aria-pressed', !pressed);
      }
    },
    isActivateEvent: function (evt) {
      return evt.keyCode && evt.keyCode === KEY_CODE.enter;
    }
  };
})();

(function () {

  var setup = document.querySelector('.setup');
  var openPopupChar = document.querySelector('.setup-open');
  var closePopupChar = setup.querySelector('.setup-close');
  var inputName = setup.querySelector('.setup-user-name');

  inputName.setAttribute('required', true);
  inputName.setAttribute('maxLength', 50);
  inputName.setAttribute('minLength', 2);

  var KEY_CODE = {
    'escape': 27
  };

  var setupKeydownHandler = function (evt) {
    if (evt.keyCode === KEY_CODE.escape) {
      setup.classList.add('invisible');
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
    window.setup.ariaPressedChange(openPopupChar);
  });

  closePopupChar.addEventListener('click', function () {
    hideSetupElement();
    window.setup.ariaPressedChange(closePopupChar);
  });

  openPopupChar.addEventListener('keydown', function (evt) {
    if (window.setup.isActivateEvent(evt)) {
      showSetupElement();
      window.setup.ariaPressedChange(openPopupChar);
    }
  });

  closePopupChar.addEventListener('keydown', function (evt) {
    if (window.setup.isActivateEvent(evt)) {
      hideSetupElement();
      window.setup.ariaPressedChange(closePopupChar);
    }
  });

  window.getColorElement.colorizeElement(document.getElementById('wizard-coat'),
    ['#ee4830',
      '#30a8ee',
      '#5ce6c0',
      '#e848d5',
      '#e6e848',
      '#e6e848'],
      'fill'
);

  window.getColorElement.colorizeElement(document.getElementById('wizard-eyes'),
    ['black',
      'red',
      'blue',
      'yellow',
      'green'],
      'fill'
);

  window.getColorElement.colorizeElement(document.querySelector('.setup-fireball-wrap'),
    ['#ee4830',
      '#30a8ee',
      '#5ce6c0',
      '#e848d5',
      '#e6e848'],
      'backgroundColor'
);
})();
