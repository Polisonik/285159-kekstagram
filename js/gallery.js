'use strict';
// в функцию нужно передать массив с данными о фотографиях и вызвать функцию создания dom-элемента для одной фотогрфии.
(function () {
  // Добавление фотографий в блок .pictures
  function successHandler(arrayPictures) {
		window.render(arrayPictures);
		window.sort(arrayPictures);		
  }
  window.backend.load(successHandler, window.utils.showErrorsConnection);
})();
