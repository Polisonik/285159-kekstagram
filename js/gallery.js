'use strict';
// в функцию нужно передать массив с данными о фотографиях и вызвать функцию создания dom-элемента для одной фотогрфии.
(function () {
  // Добавление фотографий в блок .pictures
  function successHandler(arrayPictures) {
    var elementList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arrayPictures.length; i++) {
      fragment.appendChild(window.picture.createPhoto(arrayPictures[i]));
    }
    elementList.appendChild(fragment);
  }
  window.backend.load(successHandler, window.utils.showErrorsConnection);
})();
