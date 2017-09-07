'use strict';

(function () {
  controlUploadOvelrlay();

	// Работа с окном кадрирования
  function controlUploadOvelrlay() {
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
      validateForm();
      uploadOverlay.classList.remove('hidden');
      document.addEventListener('keydown', onKeydownEscClose);
      uploadCansel.addEventListener('click', onClickCansel);
      uploadCansel.addEventListener('keydown', onKeydownEnterCansel);
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
      form.removeEventListener('submit', onValidate);
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
		// Валидация формы
    function validateForm() {
      form.addEventListener('submit', onValidate);
    }
    function onValidate(event) {
      var input = form.querySelector('.upload-form-hashtags');
      var textarea = form.querySelector('.upload-form-description');
      var hashtags = input.value.split(' ');
      var description = textarea.value;
      var messagesInput = [];
      var messagesDescription = [];

      removeErrors();
      if (isFirstSymbolHashtag(hashtags)) {
        messagesInput.push('хэш-тег должен начинаться с символа `#` и состоять из одного слова');
      }
      if (isCountHashtegs(hashtags)) {
        messagesInput.push('нельзя указать больше пяти хэш-тегов');
      }
      if (isMaxLength(hashtags)) {
        messagesInput.push('максимальная длина одного хэш-тега 20 символов');
      }
      if (isEqualHashtag(hashtags)) {
        messagesInput.push('один и тот же хэш-тег не может быть использован дважды');
      }
      if (isDescriptionEmpty(description)) {
        messagesDescription.push('поле "комментарий" обязателен для заполнения');
      }
      if (isMaxLengthDescription(description)) {
        messagesDescription.push('Максимальная длина комментария — 100 символов');
      }
      if (isMinLengthDescription(description)) {
        messagesDescription.push('Минимальная длина комментария — 30 символов');
      }
      if (messagesInput.length) {
        event.preventDefault();
        showErrors(messagesInput, input);
      }
      if (messagesDescription.length) {
        event.preventDefault();
        showErrors(messagesDescription, textarea);
      }
      // restoreDefault();
    }
    // проверка,если хештеги отсутствуют
    function isEmptyHashtag(hashtags) {
      return (hashtags.join() === '');
    }
    // Проверка первого симовла хештега на равенстов '#'
    function isFirstSymbolHashtag(hashtags) {
      for (var i = 0; i < hashtags.length; i++) {
        if ((!isEmptyHashtag(hashtags)) && (hashtags[i][0] !== '#') || (hashtags[i][0] === '#') && (hashtags[i].length < 2)) {
          return true;
        }
      }
      return false;
    }
    // Проверка на максимальное количество хештегов
    function isCountHashtegs(hashtags) {
      var hashtagsCount = 5;
      return (hashtags.length > hashtagsCount);
    }
    // Проверка длины одного хештега
    function isMaxLength(hashtags) {
      var maxLength = 20;
      for (var i = 0; i < hashtags.length; i++) {
        if (hashtags[i].length > maxLength) {
          return (hashtags[i].length > maxLength);
        }
      }
      return false;
    }
    // Проверка на одинаковые хештеги
    function isEqualHashtag(hashtags) {
      for (var i = 0; i < hashtags.length - 1; i++) {
        var item = hashtags[i];
        for (var j = i + 1; j < hashtags.length; j++) {
          if (item === hashtags[j]) {
            return true;
          }
        }
      }
      return false;
    }
    // Проверка ввода комментария.
    function isDescriptionEmpty(description) {
      return (description === '');
    }
    // Проверка минимальной длины комментария.
    function isMinLengthDescription(description) {
      return (description.length < 30);
    }
    // Проверка максимальной длины комментария
    function isMaxLengthDescription(description) {
      return (description.length > 100);
    }
    // Функция вывода ошибок
    function showErrors(errors, element) {
      var ul = document.createElement('ul');
      element.style.borderColor = 'red';
      ul.className = 'errors';
      ul.style.listStyle = 'none';
      ul.style.color = 'red';
      element.parentElement.appendChild(ul);
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < errors.length; i++) {
        var li = document.createElement('li');
        li.textContent = errors[i];
        fragment.appendChild(li);
      }
      ul.appendChild(fragment);
    }
    /* function restoreDefault() {
      uploadResize.value = '55%';
      uploadOverlay.querySelector('.upload-form-preview').className = 'upload-form-preview';
      form.querySelector('.upload-form-hashtags').value = '';
      form.querySelector('.upload-form-description').value = '';
    }*/
    function removeErrors() {
      var errors = form.querySelectorAll('.errors');
      for (var i = 0; i < errors.length; i++) {
        errors[i].remove();
      }
    }
  }
})();
