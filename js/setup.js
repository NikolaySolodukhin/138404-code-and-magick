'use strict';

window.enableSetup = (function () {

  var setup = document.querySelector('.setup');
  var setupUserPic = setup.querySelector('.setup-user-pic');
  var openPopupChar = document.querySelector('.setup-open');
  var setupOpen = openPopupChar.querySelector('.setup-open-icon');
  var closePopupChar = setup.querySelector('.setup-close');
  var onSetupClose = null;


  var showSetupElement = function () {
    setup.classList.remove('invisible');
    window.loadWizardsAll.loadWizards();

    document.addEventListener('keydown', window.settings.setupKeydownHandler);

    window.settings.toggleAria(setupOpen, 'aria-hidden');
    window.settings.toggleAria(setupOpen, 'aria-pressed');
    window.settings.toggleAria(setup, 'aria-hidden');

  };

  var hideSetupElement = function () {
    setup.classList.add('invisible');
    document.removeEventListener('keydown', window.settings.setupKeydownHandler);
    window.settings.toggleAria(setupOpen, 'aria-hidden');
    window.settings.toggleAria(closePopupChar, 'aria-pressed');
    window.settings.toggleAria(setup, 'aria-hidden');

    if (typeof onSetupClose === 'function') {
      onSetupClose();
    }
  };

  var focusOnSetupUserPic = function () {
    setupUserPic.focus();
  };

  openPopupChar.addEventListener('click', function () {
    showSetupElement();
    focusOnSetupUserPic();
  });

  closePopupChar.addEventListener('click', function () {
    hideSetupElement();
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
    focusOnSetupUserPic();
    closePopupChar.addEventListener('keydown', onKeyDown);

    onSetupClose = cb;
  };

})();

window.changeWizardSetup = (function () {

  var wizardCoat = document.getElementById('wizard-coat');
  var wizardEyes = document.getElementById('wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');
  var timer;
  var THROTTLE_TIMEOUT = 5000;

  var startTimer = function () {
    timer = setTimeout(window.loadWizardsAll.loadWizards(), THROTTLE_TIMEOUT);
  };

  var throttle = function () {
    clearTimeout(timer);
    startTimer();
  };

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
      throttle();
    }
  });

  wizardCoat.addEventListener('click', function (evt) {
    givetoggleAria(evt);
    addColorWizardCoat(evt);
    throttle();
  });


  fireball.addEventListener('keydown', function (evt) {
    givetoggleAria(evt);
    if (window.settings.isActivationEvent(evt)) {
      addColorFireball(evt);
      throttle();
    }
  });

  fireball.addEventListener('click', function (evt) {
    givetoggleAria(evt);
    addColorFireball(evt);
    throttle();
  });

  wizardEyes.addEventListener('keydown', function (evt) {
    givetoggleAria(evt);
    if (window.settings.isActivationEvent(evt)) {
      addColorEyes(evt);
      throttle();
    }
  });

  wizardEyes.addEventListener('click', function (evt) {
    givetoggleAria(evt);
    addColorEyes(evt);
    throttle();
  });

  var addColorWizardCoat = function (evt) {
    return window.getColorElement(evt.currentTarget, CoatAndFireballColors, 'fill', giveColorAndProperty(evt));
  };

  var addColorFireball = function (evt) {
    return window.getColorElement(evt.currentTarget, CoatAndFireballColors, 'backgroundColor', giveColorAndProperty(evt));
  };

  var addColorEyes = function (evt) {
    return window.getColorElement(evt.currentTarget, colorsEyes, 'fill', giveColorAndProperty(evt));
  };

})();
