'use strict';
(function () {
	// Работа с окном кадрирования
  var form = document.querySelector('#upload-select-image');
  var uploadFile = form.querySelector('#upload-file');
  var uploadOverlay = form.querySelector('.upload-overlay');
  var uploadCansel = uploadOverlay.querySelector('.upload-form-cancel');
  var buttonDecrease = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
  var buttonIncrease = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
  var blockEffect = uploadOverlay.querySelector('.upload-effect-controls');
  var uploadResize = uploadOverlay.querySelector('.upload-resize-controls');
  var photo = uploadOverlay.querySelector('.effect-image-preview');

  uploadFile.addEventListener('change', onInputFile);

  function onInputFile() {
    openUploadOverlay();
  }
  function openUploadOverlay() {
    controlResize();
    applyEffect();
		moveToggle();
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onKeydownEscClose);
    uploadCansel.addEventListener('click', onClickCansel);
    uploadCansel.addEventListener('keydown', onKeydownEnterCansel);
    form.addEventListener('submit', onSubmit);
  }
  function closeUploadOverlay() {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onKeydownEscClose);
    uploadCansel.removeEventListener('click', onClickCansel);
    uploadCansel.removeEventListener('keydown', onKeydownEnterCansel);
    buttonDecrease.removeEventListener('click', onClickDesrease);
    buttonDecrease.removeEventListener('keydown', onKeydownEnterDesrease);
    buttonIncrease.removeEventListener('click', onClickIncrease);
    buttonIncrease.removeEventListener('keydown', onKeydownEnterIncrease);
    blockEffect.removeEventListener('click', onClickEffect);
    form.removeEventListener('submit', onSubmit);
  }
  function onSubmit(event) {
    window.validate.isValid(event, form);
  }
  function onKeydownEscClose(event) {
    var ESC = 27;
    var descriptionPhoto = document.querySelector('.upload-form-description');
    if (event.keyCode === ESC && descriptionPhoto !== document.activeElement) {
      closeUploadOverlay();
    }
  }
  function onClickCansel() {
    closeUploadOverlay();
  }
  function onKeydownEnterCansel(event) {
    var ENTER = 13;
    if (event.keyCode === ENTER) {
      closeUploadOverlay();
    }
  }
  // Изменение масштаба фотографии
  function controlResize() {
    buttonDecrease.addEventListener('click', onClickDesrease);
    buttonDecrease.addEventListener('keydown', onKeydownEnterDesrease);
    buttonIncrease.addEventListener('click', onClickIncrease);
    buttonIncrease.addEventListener('keydown', onKeydownEnterIncrease);
  }
  // Функция уменьшнния значения масштаба
  function getValueDesrease() {
    var inputData = uploadResize.querySelector('.upload-resize-controls-value');
    var initialValue = parseInt(inputData.value, 10);
    var min = 25;
    var step = 25;
    var value = initialValue - step;
    if (value < min) {
      value = min;
    }
    inputData.value = value + '%';
    return value;
  }
  // Функция увеличения значения масштаба
  function getValueIncrease() {
    var inputData = uploadResize.querySelector('.upload-resize-controls-value');
    var initialValue = parseInt(inputData.value, 10);
    var max = 100;
    var step = 25;
    var value = initialValue + step;

    if (value > max) {
      value = max;
    }
    inputData.value = value + '%';
    return value;
  }
  function onClickDesrease(event) {
    getValueDesrease();
    resizeScale();
  }
  function onClickIncrease() {
    getValueIncrease();
    resizeScale();
  }
  function onKeydownEnterDesrease(event) {
    var ENTER = 13;
    if (event.keyCode === ENTER) {
      getValueDesrease();
      resizeScale();
    }
  }
  function onKeydownEnterIncrease(event) {
    var ENTER = 13;
    if (event.keyCode === ENTER) {
      getValueIncrease();
      resizeScale();
    }
  }
  // Функция изменения мастштаба фотографии
  function resizeScale() {
    var scaleInput = uploadOverlay.querySelector('.upload-resize-controls-value').value;
    var persent = 100;
    photo.style.transform = 'scale(' + parseInt(scaleInput, 10) / persent + ')';
  }
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
  }
	// Оживление ползунка
	//1. <div class="upload-effect-level-line"> - шкала длина 455 px
	//2. <div class="upload-effect-level-pin"></div>  - 18px X 18px ползунок
	//3. <div class="upload-effect-level-val"></div> - линия заполнения, 20% начальное значение.
	function moveToggle() {
		
		var toggle = document.querySelector('.upload-effect-level-pin');
		var line = document.querySelector('.upload-effect-level-line');
    var container = document.querySelector('.upload-effect-level');
		var bar =document.querySelector('.upload-effect-level-val');
		
		toggle.addEventListener('mousedown', onMouseDown);
		function onMouseDown(event) {
			event.preventDefault();
			var startX = event.clientX;
			var widthToggle = toggle.clientWidth;
		  var widthLine = line.clientWidth;
								
			document.addEventListener('mousemove', onMouseMove);
			document.addEventListener('mouseup', onMouseUp);
			
			function onMouseMove(moveEvent) {
				moveEvent.preventDefault();
				
				var shiftX = startX -  moveEvent.clientX;
				var leftLimit =  line.offsetLeft - widthToggle;
				var rightLimit = line.offsetWidth;
				if ((toggle.offsetLeft - shiftX) <= leftLimit) {
					toggle.style.left = '0%';
					bar.style.width = '0%';
					//startX = leftLimit;
				} else if ((toggle.offsetLeft - shiftX) > rightLimit) {
					toggle.style.left = '100%';
					bar.style.width = '100%';
					//startX = rightLimit;
				} else {
					toggle.style.left = (toggle.offsetLeft - shiftX) * 100 / 455 + '%';
					bar.style.width = (toggle.offsetLeft - shiftX)* 100 / 455 + '%';
					//
				}
				startX = moveEvent.clientX;
			}
			function onMouseUp(upEvent) {
				upEvent.preventDefault();
				document.removeEventListener('mousemove', onMouseMove);
			  document.removeEventListener('mouseup', onMouseUp);				
			}
		}
	}
	
})();
