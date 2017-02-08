'use strict';

window.utils = {
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
