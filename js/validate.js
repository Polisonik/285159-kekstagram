'use strict';
(function () {
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
    var minLengthDescription = 30;
    return (description.length < minLengthDescription);
  }
  // Проверка максимальной длины комментария
  function isMaxLengthDescription(description) {
    var maxLengthDescription = 100;
    return (description.length > maxLengthDescription);
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
    var form = document.querySelector('#upload-select-image');
		var textarea = form.querySelector('.upload-form-description');
    var input = form.querySelector('.upload-form-hashtags');
    var errors = form.querySelectorAll('.errors');
		textarea.style.borderColor = 'initial';
		input.style.borderColor = 'initial';
    for (var i = 0; i < errors.length; i++) {
      errors[i].remove();
    }
  }
  window.validate = {
    isValid: function (event, form) {
      var textarea = form.querySelector('.upload-form-description');
      var input = form.querySelector('.upload-form-hashtags');
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
				//event.preventDefault();
        showErrors(messagesInput, input);
      }
      if (messagesDescription.length) {
				//event.preventDefault();
        showErrors(messagesDescription, textarea);
      }    
    }
  };
})();
