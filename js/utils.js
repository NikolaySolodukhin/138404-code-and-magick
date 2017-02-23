'use strict';

window.utils = (function () {
  return {
    getRandomElement: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    getRandomElementExcept: function (arr, arrElement) {
      var currentColor = this.getRandomElement(arr);

      while (currentColor === arrElement) {
        currentColor = this.getRandomElement(arr);
      }
      return currentColor;
    }
  };
})();

window.settings = (function () {

  var setup = document.querySelector('.setup');

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

    setupKeydownHandler: function (evt) {
      if (window.settings.isDeactivationEvent(evt)) {
        setup.classList.add('invisible');
      }
    },

        // функция для замены id на классы и удаления лишних атрибутов
    changeIdToClass: function (arr) {
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i].getAttribute('id');
        if (item) {
          arr[i].removeAttribute('id');
          arr[i].removeAttribute('tabindex');
          arr[i].removeAttribute('aria-pressed');
          arr[i].setAttribute('class', item);
        }
      }
    }
  };
})();
