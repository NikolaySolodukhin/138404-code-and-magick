'use strict';

window.loadWizardsAll = (function () {

  var setupOpen = document.querySelector('.setup-open-icon');

  var DATA_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/code-and-magick/data';

  var focusOpenButton = function () {
    setupOpen.focus();
  };

  var onSetupKeydown = function (evt) {
    if (window.settings.isActivationEvent(evt)) {
      window.enableSetup(focusOpenButton);
    }
  };

  var getDifferentWizards = function (arr) {
    var newArr = [];
    var wizardsAmount = 5;

    for (var i = 0; i < wizardsAmount; i++) {
      var randomItem = window.utils.getRandomElement(arr);
      newArr.push(randomItem);
    }

    return newArr;
  };


  focusOpenButton();
  setupOpen.addEventListener('keydown', onSetupKeydown);

  return {
    loadWizards: function () {
      window.load(DATA_URL, function (data) {
        var wizards = data;
        var setupSimilar = document.querySelector('.setup-similar');
        setupSimilar.innerHTML = '';
        var fragment = document.createDocumentFragment();
        getDifferentWizards(wizards).forEach(function (wizard) {
          fragment.appendChild(window.render(wizard));
        });
        setupSimilar.appendChild(fragment);
      });
    }
  };


})();
