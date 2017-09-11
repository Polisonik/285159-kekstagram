'use strict';
(function () {
  var min = 25;
  var max = 100;
  var step = 25;

  var resizeValue = null;
  var buttonDecrease = null;
  var buttonIncrease = null;

  var resizeScale = null;

  function controlResize(scaleElement) {
    resizeValue = scaleElement.querySelector('.upload-resize-controls-value');
    buttonDecrease = scaleElement.querySelector('.upload-resize-controls-button-dec');
    buttonIncrease = scaleElement.querySelector('.upload-resize-controls-button-inc');

    buttonDecrease.addEventListener('click', onClickDesrease);
    buttonIncrease.addEventListener('click', onClickIncrease);
  }
  // Получаем текущее значение масштаба
  function getResizeValue() {
    return parseInt(resizeValue.value, 10);
  }
  // Обработка события нажатия на кнопку уменьшения масштаба
  function onClickDesrease() {
    var value = getResizeValue() - step;
    if (value < min) {
      value = min;
    }
    resizeValue.value = value + '%';

    if (typeof resizeScale === 'function') {
      resizeScale(value);
    }
  }
  // Обработка события нажатия на кнопку увеличения масштаба
  function onClickIncrease() {
    var value = getResizeValue() + step;
    if (value > max) {
      value = max;
    }
    resizeValue.value = value + '%';
    if (typeof resizeScale === 'function') {
      resizeScale(value);
    }
  }
  window.initializeScale = {
    init: function (scaleElement, callback) {
      controlResize(scaleElement);
      resizeScale = callback;
    }
  };
})();
