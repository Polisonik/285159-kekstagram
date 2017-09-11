'use strict';
(function () {
	// Работа с окном кадрирования
  var form = document.querySelector('#upload-select-image');
  var uploadFile = form.querySelector('#upload-file');
  var uploadOverlay = form.querySelector('.upload-overlay');
  var uploadCansel = uploadOverlay.querySelector('.upload-form-cancel');
  //var buttonDecrease = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
  //var buttonIncrease = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
  var blockEffect = uploadOverlay.querySelector('.upload-effect-controls');
  var uploadResize = uploadOverlay.querySelector('.upload-resize-controls');
  
  var toggle = document.querySelector('.upload-effect-level-pin');
  var bar = document.querySelector('.upload-effect-level-val');
  var line = document.querySelector('.upload-effect-level-line');
	
  var scaleElement = document.querySelector('.upload-resize-controls');
	var photo = uploadOverlay.querySelector('.effect-image-preview');
  

  uploadFile.addEventListener('change', onInputFile);
  function onInputFile() {
    openUploadOverlay();
  }
  function openUploadOverlay() {
    applyEffect();
    moveToggle();
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onKeydownEscClose);
    uploadCansel.addEventListener('click', onClickCanсel);
    uploadCansel.addEventListener('keydown', onKeydownEnterCanсel);
    form.addEventListener('submit', onSubmit);
    toggle.style.display = 'none';
    bar.style.width = '0%';
  }
  function closeUploadOverlay() {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onKeydownEscClose);
    uploadCansel.removeEventListener('click', onClickCanсel);
    uploadCansel.removeEventListener('keydown', onKeydownEnterCanсel);
    buttonDecrease.removeEventListener('click', onClickDesrease);
    buttonDecrease.removeEventListener('keydown', onKeydownEnterDesrease);
    buttonIncrease.removeEventListener('click', onClickIncrease);
    buttonIncrease.removeEventListener('keydown', onKeydownEnterIncrease);
    blockEffect.removeEventListener('click', onClickEffect);
    form.removeEventListener('submit', onSubmit);
    toggle.removeEventListener('mousedown', onMouseDown);
  }
  function onSubmit(event) {
    window.validate.isValid(event, form);
  }
  function onKeydownEscClose(event) {
    var descriptionPhoto = document.querySelector('.upload-form-description');
    if (event.keyCode === window.utils.ESC && descriptionPhoto !== document.activeElement) {
      closeUploadOverlay();
    }
  }
  function onClickCanсel() {
    closeUploadOverlay();
  }
  function onKeydownEnterCanсel(event) {
    if (event.keyCode === window.utils.ENTER) {
      closeUploadOverlay();
    }
  }
  	
  // Функция изменения мастштаба фотографии
  function adjustScale(scale) {
    photo.style.transform = 'scale(' + scale / window.utils.PERCENT + ')';
  }	
	window.initializeScale.init(scaleElement, adjustScale);
	
  // Добавление эффектов
  function applyEffect() {
    blockEffect.addEventListener('click', onClickEffect);
  }
  function onClickEffect(event) {
    var target = event.target;
    var filterName = target.value;
    var defaultClass = 'effect-image-preview';

    if (target.tagName !== 'INPUT') {
      return;
    }
    photo.className = defaultClass + ' ' + 'effect-' + filterName;
    resetDefaultEffect();
  }
  // Сбрасывание значений фильтров к значениям, которые были по умолчанию
  function resetDefaultEffect() {
    var defaultClass = 'effect-image-preview';
    var effectByDefault = {
      none: 'none',
      chrome: 'grayscale(1)',
      sepia: 'sepia(1)',
      marvin: 'invert(100%)',
      phobos: 'blur(5px)',
      heat: 'brightness(3)'
    };

    toggle.style.left = '20%';
    toggle.style.display = 'block';
    bar.style.width = '20%';
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
      toggle.style.display = 'none';
      bar.style.width = '0%';
    }
  }
  // Оживление ползунка
  function moveToggle() {
    toggle.addEventListener('mousedown', onMouseDown);
  }
  function onMouseDown(event) {
    event.preventDefault();
    var startX = event.clientX;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(moveEvent) {
      moveEvent.preventDefault();
      var shiftX = startX - moveEvent.clientX;
      var leftLimit = 0;

      if ((toggle.offsetLeft - shiftX) <= leftLimit) {
        toggle.style.left = '0%';
        bar.style.width = '0%';
      } else if ((toggle.offsetLeft - shiftX) > line.offsetWidth) {
        toggle.style.left = '100%';
        bar.style.width = '100%';
      } else {
        toggle.style.left = (toggle.offsetLeft - shiftX) * window.utils.PERCENT / line.offsetWidth + '%';
        bar.style.width = (toggle.offsetLeft - shiftX) * window.utils.PERCENT / line.offsetWidth + '%';
      }
      startX = moveEvent.clientX;
      changeSaturation();
    }
    function onMouseUp(upEvent) {
      upEvent.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  }
  function changeSaturation() {
    var phobosMultiplier = 3;
    var heatMultiplier = 3;
    var effect = parseInt(toggle.style.left, 10) / window.utils.PERCENT;

    if (photo.classList.contains('effect-chrome')) {
      photo.style.filter = 'grayscale(' + effect + ')';
    } else if (photo.classList.contains('effect-sepia')) {
      photo.style.filter = 'sepia(' + effect + ')';
    } else if (photo.classList.contains('effect-marvin')) {
      photo.style.filter = 'invert(' + effect * window.utils.PERCENT + '%)';
    } else if (photo.classList.contains('effect-phobos')) {
      photo.style.filter = 'blur(' + effect * phobosMultiplier + 'px)';
    } else if (photo.classList.contains('effect-heat')) {
      photo.style.filter = 'brightness(' + effect * heatMultiplier + ')';
    }
  }
})();
