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

    toggleAria: function (elem, attribute) {
      var attribValue = elem.getAttribute(attribute);
      if (attribValue === 'false') {
        elem.setAttribute(attribute, 'true');
      } else {
        elem.setAttribute(attribute, 'false');
      }
    },
  };
})();

window.enableSetup = (function () {

  var setup = document.querySelector('.setup');
  var openPopupChar = document.querySelector('.setup-open');
  var setupOpen = openPopupChar.querySelector('.setup-open-icon');
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
    window.settings.toggleAria(setupOpen, 'aria-hidden');
    window.settings.toggleAria(setupOpen, 'aria-pressed');
    window.settings.toggleAria(setup, 'aria-hidden');
  };

  var hideSetupElement = function () {
    setup.classList.add('invisible');
    document.removeEventListener('keydown', setupKeydownHandler);
    window.settings.toggleAria(setupOpen, 'aria-hidden');
    window.settings.toggleAria(closePopupChar, 'aria-pressed');
    window.settings.toggleAria(setup, 'aria-hidden');
    if (typeof onSetupClose === 'function') {
      onSetupClose();
    }
  };

  openPopupChar.addEventListener('click', function () {
    showSetupElement();
  });

  closePopupChar.addEventListener('click', function () {
    hideSetupElement();
  });

  openPopupChar.addEventListener('keydown', function (evt) {
    if (window.settings.isActivationEvent(evt)) {
      showSetupElement();
    }
  });

  closePopupChar.addEventListener('keydown', function (evt) {
    if (window.settings.isActivationEvent(evt)) {
      hideSetupElement();
    }
  });

  var onKeyDown = function (evt) {
    if (window.settings.isActivationEvent(evt)) {
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

  var givetoggleAria = function (evt) {
    return window.settings.toggleAria(evt.currentTarget, 'aria-pressed');
  };

  var giveColorAndProperty = function (evt) {
    return function (colors, property) {
      evt.currentTarget.style[property] = colors;
    };
  };

  wizardCoat.addEventListener('keydown', function (evt) {
    if (window.settings.isActivationEvent(evt)) {
      givetoggleAria(evt);
      addColorWizardCoat(evt);
    }
  });

  wizardCoat.addEventListener('click', function (evt) {
    givetoggleAria(evt);
    addColorWizardCoat(evt);
  });


  fireball.addEventListener('keydown', function (evt) {
    givetoggleAria(evt);
    if (window.settings.isActivationEvent(evt)) {
      addColorWizardCoat(evt);
    }
  });

  fireball.addEventListener('click', function (evt) {
    givetoggleAria(evt);
    addColorFireball(evt);
  });

  wizardEyes.addEventListener('keydown', function (evt) {
    givetoggleAria(evt);
    if (window.settings.isActivationEvent(evt)) {
      addColorEyes(evt);
    }
  });

  wizardEyes.addEventListener('click', function (evt) {
    givetoggleAria(evt);
    addColorEyes(evt);
  });

  var addColorWizardCoat = function (evt) {
    return window.getColorElement(evt.currentTarget, CoatAndFireballColors, evt.target.style[0], giveColorAndProperty(evt));
  };

  var addColorFireball = function (evt) {
    return window.getColorElement(evt.currentTarget, CoatAndFireballColors, 'backgroundColor', giveColorAndProperty(evt));
  };

  var addColorEyes = function (evt) {
    return window.getColorElement(evt.currentTarget, colorsEyes, 'fill', giveColorAndProperty(evt));
  };

})();
