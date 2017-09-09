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
  var toggle = document.querySelector('.upload-effect-level-pin');
	var bar =document.querySelector('.upload-effect-level-val');
	
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
		toggle.style.display = 'none';
		bar.style.width = '0%';			
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
		uploadOverlay.removeEventListener('mousemove', onMouseMove);
		uploadOverlay.removeEventListener('mouseup', onMouseUp);
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
		
    var effectByDefault ={
			none: 'none',
			chrome: 'grayscale(1)',
			sepia: 'sepia(1)',
			marvin: 'invert(100%)',
			phobos: 'blur(5px)',
			heat: 'brightness(3)'
		}

		if (target.tagName !== 'INPUT') {
      return;
    }
    photo.className = defaultClass + ' ' + 'effect-' + filterName;
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
				} else if(photo.classList.contains('effect-none') || photo.className === defaultClass ) {
					photo.style.filter = effectByDefault.none;
					toggle.style.display = 'none';
		      bar.style.width = '0%';
				}
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
		//var effect = document.querySelector('.upload-effect-preview');
		
		toggle.addEventListener('mousedown', onMouseDown);
		function onMouseDown(event) {
			event.preventDefault();
			var startX = event.clientX;
			var widthToggle = toggle.clientWidth;
		  										
			document.addEventListener('mousemove', onMouseMove);
			document.addEventListener('mouseup', onMouseUp);
			
			function onMouseMove(moveEvent) {
				moveEvent.preventDefault();
        var shiftX = startX - moveEvent.clientX;
				var leftLimit = 0;
				var percent = 100;
				var phobosMultiplier = 3;
				var heatMultiplier = 3;
							
				if ((toggle.offsetLeft - shiftX) <= leftLimit) {
					toggle.style.left = '0%';
					bar.style.width = '0%';
				} else if ((toggle.offsetLeft - shiftX) > line.offsetWidth) {
					toggle.style.left = '100%';
					bar.style.width = '100%';
				} else {
					toggle.style.left = (toggle.offsetLeft - shiftX) * percent / line.offsetWidth + '%';
					bar.style.width = (toggle.offsetLeft - shiftX) * percent / line.offsetWidth + '%';
				}
				
				startX = moveEvent.clientX;
				var effect = parseInt(toggle.style.left, 10) / percent;
				
				if (photo.classList.contains('effect-chrome')) {
					photo.style.filter = 'grayscale(' + effect + ')';
				} else if (photo.classList.contains('effect-sepia')) {
					photo.style.filter = 'sepia(' + effect + ')';
				} else if (photo.classList.contains('effect-marvin')) {
					photo.style.filter = 'invert(' + effect * percent + '%)';
				} else if (photo.classList.contains('effect-phobos')) {
					photo.style.filter = 'blur(' + effect * phobosMultiplier + 'px)';
			  } else if (photo.classList.contains('effect-heat')) {
					photo.style.filter = 'brightness(' + effect * heatMultiplier + ')';
				} 
			}
			function onMouseUp(upEvent) {
				upEvent.preventDefault();
				document.removeEventListener('mousemove', onMouseMove);
			  document.removeEventListener('mouseup', onMouseUp);				
			}
		}
	}	
})();
