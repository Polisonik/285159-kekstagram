'use strict';
(function () {
	// Работа с окном кадрирования
  var form = document.querySelector('#upload-select-image');
  var uploadFile = form.querySelector('#upload-file');
  var uploadOverlay = form.querySelector('.upload-overlay');
  var uploadCancel = uploadOverlay.querySelector('.upload-form-cancel');
  var blockEffect = uploadOverlay.querySelector('.upload-effect-controls');
  var toggle = uploadOverlay.querySelector('.upload-effect-level-pin');
  var bar = uploadOverlay.querySelector('.upload-effect-level-val');
  var line = uploadOverlay.querySelector('.upload-effect-level-line');
  var scaleElement = uploadOverlay.querySelector('.upload-resize-controls');
  var photo = uploadOverlay.querySelector('.effect-image-preview');

  uploadFile.addEventListener('change', onInputFile);
  function onInputFile() {
    openUploadOverlay();
  }
  function openUploadOverlay() {
    uploadOverlay.classList.remove('hidden');
    toggle.style.display = 'none';
    bar.style.width = '0%';
    window.initializeScale.initialize(scaleElement, adjustScale);
    window.initializeFilters(blockEffect, applyFilter);
    moveToggle();
    document.addEventListener('keydown', onKeydownEscClose);
    uploadCancel.addEventListener('click', onClickCancel);
    uploadCancel.addEventListener('keydown', onKeydownEnterCancel);
    form.addEventListener('submit', onSubmit);
  }
  function closeUploadOverlay() {
    window.resetDefaults.resetForm();
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onKeydownEscClose);
    uploadCancel.removeEventListener('click', onClickCancel);
    uploadCancel.removeEventListener('keydown', onKeydownEnterCancel);
    form.removeEventListener('submit', onSubmit);
    toggle.removeEventListener('mousedown', onMouseDown);
  }
  function saveHandler() {
    closeUploadOverlay();
    document.querySelector('.filters').classList.remove('hidden');
  }
  function onSubmit(event) {
    window.validate.isValid(event, form);
    var errors = document.querySelectorAll('.errors');
    if (!errors.length) {
      event.preventDefault();
      window.backend.save(new FormData(form), saveHandler, window.utils.showErrors);
    } else {
      event.preventDefault();
    }
  }
  function onKeydownEscClose(event) {
    var descriptionPhoto = document.querySelector('.upload-form-description');
    if (event.keyCode === window.utils.ESC && descriptionPhoto !== document.activeElement) {
      closeUploadOverlay();
    }
  }
  function onClickCancel() {
    closeUploadOverlay();
  }
  function onKeydownEnterCancel(event) {
    if (event.keyCode === window.utils.ENTER) {
      closeUploadOverlay();
    }
  }
  // Функция изменения мастштаба фотографии
  function adjustScale(scale) {
    photo.style.transform = 'scale(' + scale / window.utils.PERCENT + ')';
  }
  // Добавление эффектов
  function applyFilter(defaultClass, filterName) {
    photo.className = defaultClass + ' ' + 'effect-' + filterName;
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
