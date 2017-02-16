'use strict';
(function () {
  var setupOpen = document.querySelector('.setup-open-icon');

  var focusOpenButton = function () {
    setupOpen.focus();
  };

  var onSetupKeydown = function (evt) {
    if (window.settings.isActivationEvent(evt)) {
      window.enableSetup(focusOpenButton);
    }
  };

  setupOpen.addEventListener('keydown', onSetupKeydown);
})();
