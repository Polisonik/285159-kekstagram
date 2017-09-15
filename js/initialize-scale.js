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
    buttonDecrease.addEventListener('keydown', onKeydownEnterDesrease);
    buttonIncrease.addEventListener('keydown', onKeydownEnterIncrease);
  }
  // Получаем текущее значение масштаба
  function getResizeValue() {
    return parseInt(resizeValue.value, 10);
  }

	// Функция уменьшнния значения масштаба
  function getValueDesrease() {
    var value = getResizeValue() - step;

    if (value < min) {
      value = min;
    }
    resizeValue.value = value + '%';
    return value;
  }
  // Функция увеличения значения масштаба
  function getValueIncrease() {
    var value = getResizeValue() + step;

    if (value > max) {
      value = max;
    }
    resizeValue.value = value + '%';
    return value;
  }
  function onClickDesrease(event) {
    var scale = getValueDesrease();

    if (typeof resizeScale === 'function') {
      resizeScale(scale);
    }
  }
  function onClickIncrease() {
    var scale = getValueIncrease();

    if (typeof resizeScale === 'function') {
      resizeScale(scale);
    }
  }
  function onKeydownEnterDesrease(event) {
    var scale = getValueDesrease();

    if (event.keyCode === window.utils.ENTER) {
      if (typeof resizeScale === 'function') {
        resizeScale(scale);
      }
    }
  }
  function onKeydownEnterIncrease(event) {
    var scale = getValueIncrease();

    if (event.keyCode === window.utils.ENTER) {
      if (typeof resizeScale === 'function') {
        resizeScale(scale);
      }
    }
  }
  window.initializeScale = {
    initialize: function (scaleElement, callback) {
      controlResize(scaleElement);
      resizeScale = callback;
    }
  };
})();
