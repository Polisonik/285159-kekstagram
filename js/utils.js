'use strict';

(function () {
  window.utils = {
    ESC: 27,
    ENTER: 13,
    PERCENT: 100,
    getRandomNumber: function (min, max) { // Генерация случайного целого числа из диапазоана [min, max];
      return min + Math.floor(Math.random() * (max + 1 - min));
    }
  };
})();
