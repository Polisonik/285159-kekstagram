'use strict';
(function () {
  var changeFilter = null;
  var photo = document.querySelector('.effect-image-preview');

  function initialize(blockEffect) {
    blockEffect.addEventListener('click', onClickEffect);
  }
  function onClickEffect(event) {
    var target = event.target;
    var filterName = target.value;
    var defaultClass = 'effect-image-preview';

    if (target.tagName !== 'INPUT') {
      return;
    }
    if (typeof changeFilter === 'function') {
      changeFilter(defaultClass, filterName);
    }
    resetDefaultEffect(photo);
  }
	// Сбрасывание значений фильтров к значениям, которые были по умолчанию
  function resetDefaultEffect(photoItem) {
    var defaultClass = 'effect-image-preview';
    var effectByDefault = {
      none: 'none',
      chrome: 'grayscale(1)',
      sepia: 'sepia(1)',
      marvin: 'invert(100%)',
      phobos: 'blur(5px)',
      heat: 'brightness(3)'
    };

    document.querySelector('.upload-effect-level-pin').style.display = 'block';
    document.querySelector('.upload-effect-level-pin').style.left = '20%';
    document.querySelector('.upload-effect-level-val').style.width = '20%';
    if (photo.classList.contains('effect-chrome')) {
      photo.style.filter = effectByDefault.chrome;
    } else if (photo.classList.contains('effect-sepia')) {
      photo.style.filter = effectByDefault.sepia;
    } else if (photo.classList.contains('effect-marvin')) {
      photo.style.filter = effectByDefault.marvin;
    } else if (photo.classList.contains('effect-phobos')) {
      photo.style.filter = effectByDefault.phobos;
    } else if (photo.classList.contains('effect-heat')) {
      photo.style.filter = effectByDefault.heat;
    } else if (photo.classList.contains('effect-none') || photo.className === defaultClass) {
      photo.style.filter = effectByDefault.none;
      document.querySelector('.upload-effect-level-pin').style.display = 'none';
      document.querySelector('.upload-effect-level-val').style.width = '0%';
    }
  }
  window.initializeFilters = {
    apply: function (filterElement, callback) {
      initialize(filterElement);
      changeFilter = callback; // photo.className = defaultClass + ' ' + 'effect-' + filterName;
    }
  };
})();
