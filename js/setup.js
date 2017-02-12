'use strict';

window.settings = (function () {

  var KEY_CODE = {
    'enter': 13,
    'escape': 27
  };

  var isKeyboardEvent = function (evt) {
    return typeof evt.keyCode !== 'undefined';
  };

  return {
    isDeactivationEvent: function (evt) {
      return isKeyboardEvent(evt) && evt.keyCode === KEY_CODE.escape;
    },

    isActivationEvent: function (evt) {
      return isKeyboardEvent(evt) && evt.keyCode === KEY_CODE.enter;
    },

    isKeyboardEvent: isKeyboardEvent,
    KEY_CODE: KEY_CODE,

    ariaPressedChange: function (element) {
      if (element.getAttribute('aria-pressed') === 'true') {
        element.setAttribute('aria-pressed', !true);
      } else {
        element.setAttribute('aria-pressed', true);
      }
    },
  };
})();

window.enableSetup = (function () {

  var setup = document.querySelector('.setup');
  var openPopupChar = document.querySelector('.setup-open');
  var closePopupChar = setup.querySelector('.setup-close');
  var onSetupClose = null;

  var setupKeydownHandler = function (evt) {
    if (window.settings.isDeactivationEvent(evt)) {
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
    if (typeof onSetupClose === 'function') {
      onSetupClose();
    }
  };

  openPopupChar.addEventListener('click', function () {
    showSetupElement();
    window.settings.ariaPressedChange(openPopupChar);
  });

  closePopupChar.addEventListener('click', function () {
    hideSetupElement();
    window.settings.ariaPressedChange(closePopupChar);
  });

  openPopupChar.addEventListener('keydown', function (evt) {
    if (window.settings.isActivationEvent(evt)) {
      showSetupElement();
      window.settings.ariaPressedChange(openPopupChar);
    }
  });

  closePopupChar.addEventListener('keydown', function (evt) {
    if (window.settings.isActivationEvent(evt)) {
      hideSetupElement();
      window.settings.ariaPressedChange(closePopupChar);
    }
  });

  var onKeyDown = function (evt) {
    if (window.utils.isActivationEvent(evt)) {
      hideSetupElement();
    }
  };

  return function (cb) {
    showSetupElement();
    closePopupChar.addEventListener('keydown', onKeyDown);

    onSetupClose = cb;
  };

})();

window.changeWizardSetup = (function () {

  var wizardCoat = document.getElementById('wizard-coat');
  var wizardEyes = document.getElementById('wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');

  var CoatAndFireballColors =
    ['#ee4830',
      '#30a8ee',
      '#5ce6c0',
      '#e848d5',
      '#e6e848'];

  var colorsEyes = ['black',
    'red',
    'blue',
    'yellow',
    'green'];

  var giveAriaPressedChange = function (evt) {
    return window.settings.ariaPressedChange(evt.currentTarget);
  };

  var giveColorAndProperty = function (evt) {
    return function (colors, property) {
      evt.currentTarget.style[property] = colors;
    };
  };

  wizardCoat.addEventListener('keydown', function (evt) {
    if (window.settings.isActivationEvent(evt)) {
      giveAriaPressedChange(evt);
      window.getColorElement(evt.currentTarget,
          CoatAndFireballColors,
          'fill',
          giveColorAndProperty(evt));
    }
  });

  wizardCoat.addEventListener('click', function (evt) {
    giveAriaPressedChange(evt);
    window.getColorElement(evt.currentTarget,
        CoatAndFireballColors,
        'fill',
        giveColorAndProperty(evt));
  });


  fireball.addEventListener('keydown', function (evt) {
    giveAriaPressedChange(evt);
    if (window.settings.isActivationEvent(evt)) {
      window.getColorElement(evt.currentTarget,
          CoatAndFireballColors,
          'backgroundColor',
          giveColorAndProperty(evt));
    }
  });

  fireball.addEventListener('click', function (evt) {
    giveAriaPressedChange(evt);
    window.getColorElement(evt.currentTarget,
        CoatAndFireballColors,
        'backgroundColor',
        giveColorAndProperty(evt));
  });

  wizardEyes.addEventListener('keydown', function (evt) {
    giveAriaPressedChange(evt);
    if (window.settings.isActivationEvent(evt)) {
      window.getColorElement(evt.currentTarget,
          colorsEyes,
          'fill',
          giveColorAndProperty(evt));
    }
  });

  wizardEyes.addEventListener('click', function (evt) {
    giveAriaPressedChange(evt);
    window.getColorElement(evt.currentTarget,
        colorsEyes,
        'fill',
        giveColorAndProperty(evt));
  });
})();
