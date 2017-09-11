'use strict';
(function () {
  function showToggle() {
    document.querySelector('.upload-effect-level-pin').style.display = 'block';
    document.querySelector('.upload-effect-level-pin').style.left = '20%';
    document.querySelector('.upload-effect-level-val').style.width = '20%';
  }
  function hideToggle() {
    document.querySelector('.upload-effect-level-pin').style.display = 'none';
    document.querySelector('.upload-effect-level-val').style.width = '0%';
  }
  window.resetEffect = function (photo) {
    var defaultClass = 'effect-image-preview';
    var effectByDefault = {
      none: 'none',
      chrome: 'grayscale(1)',
      sepia: 'sepia(1)',
      marvin: 'invert(100%)',
      phobos: 'blur(5px)',
      heat: 'brightness(3)'
    };

    if (photo.classList.contains('effect-chrome')) {
      photo.style.filter = effectByDefault.chrome;
      showToggle();
    } else if (photo.classList.contains('effect-sepia')) {
      photo.style.filter = effectByDefault.sepia;
      showToggle();
    } else if (photo.classList.contains('effect-marvin')) {
      photo.style.filter = effectByDefault.marvin;
      showToggle();
    } else if (photo.classList.contains('effect-phobos')) {
      photo.style.filter = effectByDefault.phobos;
      showToggle();
    } else if (photo.classList.contains('effect-heat')) {
      photo.style.filter = effectByDefault.heat;
      showToggle();
    } else if (photo.classList.contains('effect-none') || photo.className === defaultClass) {
      photo.style.filter = effectByDefault.none;
      hideToggle();
    }
  };
})();
