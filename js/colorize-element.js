'use strict';

window.getColorElement = function (element, colors, property, callback) {

  var getRandomColor = function () {
    return window.utils.getRandomElementExcept(colors, rgbToHex(element.style[property]));
  };

  var rgbToHex = function (color) {
    var nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color);
    if (!nums) {
      return color;
    }

    var R = parseInt(nums[2], 10).toString(16);
    var G = parseInt(nums[3], 10).toString(16);
    var B = parseInt(nums[4], 10).toString(16);

    return '#' + (
        (R.length === 1 ? '0' + R : R) +
        (G.length === 1 ? '0' + G : G) +
        (B.length === 1 ? '0' + B : B)
      );
  };

  return callback(getRandomColor(), property);
};
