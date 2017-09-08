'use strict';
// в функцию нужно передать массив с данными о фотографиях и вызвать функцию создания dom-элемента для одной фотогрфии.
(function () {
  addContentPictures();
	// Добавление фотографий в блок .pictures
  function addContentPictures() {
    var arrayPictures = window.data.getDate();
    var numberPhotos = 25;
    var elementList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < numberPhotos; i++) {
      fragment.appendChild(window.picture.createPhoto(arrayPictures[i]));
    }
    elementList.appendChild(fragment);
  }
})();
