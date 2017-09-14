'use strict';
(function () {
  window.utils = {
    ESC: 27,
    ENTER: 13,
    PERCENT: 100,
    getRandomNumber: function (min, max) { // Генерация случайного целого числа из диапазоана [min, max];
      return min + Math.floor(Math.random() * (max + 1 - min));
    },
    showErrors: function (errorMessage) {
      var node = document.createElement('div');
      node.style.zIndex = '100';
      node.style.margin = '0 auto';
      node.style.textAlign = 'center';
      node.style.background = 'grey';
      node.style.color = 'red';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
