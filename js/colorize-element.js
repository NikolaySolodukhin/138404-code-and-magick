'use strict';
window.getColorElement = (function () {
  return {
    colorizeElement: function (element, colors, property) {
      var getRandomColor = function () {
        var currentColor = window.utils.getRandomElementExcept(colors, rgbHex(element.style[property]));
        element.style[property] = currentColor;
        window.setup.ariaPressedChange(element);
      };

      var getRandomColorByKeyborad = function (evt) {
        if (window.setup.isActivateEvent(evt)) {
          getRandomColor();
          window.setup.ariaPressedChange(element);
        }
      };

      var rgbHex = function (color) {
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

      element.addEventListener('keydown', getRandomColorByKeyborad);
      element.addEventListener('click', getRandomColor);
    }
  };
})();
