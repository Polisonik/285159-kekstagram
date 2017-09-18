'use strict';
(function () {
  // проверка,если хештеги отсутствуют
  function checkEmptyHashtag(hashtags) {
    return (hashtags.join() === '');
  }
  // Проверка первого симовла хештега на равенстов '#'
  function checkFirstSymbolHashtag(hashtags) {
    var minLengthHashtag = 2;

    for (var i = 0; i < hashtags.length; i++) {
      if ((!checkEmptyHashtag(hashtags)) && (hashtags[i][0] !== '#') || (hashtags[i][0] === '#') && (hashtags[i].length < minLengthHashtag)) {
        return true;
      }
    }
    return false;
  }
  // Проверка на максимальное количество хештегов
  function checkCountHashtegs(hashtags) {
    var hashtagsCount = 5;
    return (hashtags.length > hashtagsCount);
  }
  // Проверка длины одного хештега
  function checkMaxLength(hashtags) {
    var maxLength = 20;

    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i].length > maxLength) {
        return true;
      }
    }
    return false;
  }
  // Проверка на одинаковые хештеги
  function checkEqualHashtag(hashtags) {
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
  function checkDescriptionEmpty(description) {
    return (description === '');
  }
  // Проверка минимальной длины комментария.
  function checkMinLengthDescription(description) {
    var minLengthDescription = 30;
    return (description.length < minLengthDescription);
  }
  // Проверка максимальной длины комментария
  function checkMaxLengthDescription(description) {
    var maxLengthDescription = 100;
    return (description.length > maxLengthDescription);
  }
  // Функция вывода ошибок валидации полей формы
  function showErrors(errors, element) {
    var ul = document.createElement('ul');
    var fragment = document.createDocumentFragment();

    element.style.borderColor = 'red';
    ul.className = 'errors';
    ul.style.listStyle = 'none';
    ul.style.color = 'red';
    element.parentElement.appendChild(ul);
    for (var i = 0; i < errors.length; i++) {
      var li = document.createElement('li');
      li.textContent = errors[i];
      fragment.appendChild(li);
    }
    ul.appendChild(fragment);
  }
  window.validate = {
    isValid: function (event, form) {
      var textarea = form.querySelector('.upload-form-description');
      var input = form.querySelector('.upload-form-hashtags');
      var hashtags = input.value.split(' ');
      var description = textarea.value;
      var messagesInput = [];
      var messagesDescription = [];

      window.validate.removeErrors(textarea, input, form);
      if (checkFirstSymbolHashtag(hashtags)) {
        messagesInput.push('хэш-тег должен начинаться с символа `#` и состоять из одного слова');
      }
      if (checkCountHashtegs(hashtags)) {
        messagesInput.push('нельзя указать больше пяти хэш-тегов');
      }
      if (checkMaxLength(hashtags)) {
        messagesInput.push('максимальная длина одного хэш-тега 20 символов');
      }
      if (checkEqualHashtag(hashtags)) {
        messagesInput.push('один и тот же хэш-тег не может быть использован дважды');
      }
      if (checkDescriptionEmpty(description)) {
        messagesDescription.push('поле "комментарий" обязателен для заполнения');
      }
      if (checkMaxLengthDescription(description)) {
        messagesDescription.push('Максимальная длина комментария — 100 символов');
      }
      if (checkMinLengthDescription(description)) {
        messagesDescription.push('Минимальная длина комментария — 30 символов');
      }
      if (messagesInput.length) {
        showErrors(messagesInput, input);
      }
      if (messagesDescription.length) {
        showErrors(messagesDescription, textarea);
      }
    },
    removeErrors: function (textarea, input, form) {
      var errors = form.querySelectorAll('.errors');

      textarea.style.borderColor = 'initial';
      input.style.borderColor = 'initial';
      for (var i = 0; i < errors.length; i++) {
        errors[i].remove();
      }
    }
  };
})();
