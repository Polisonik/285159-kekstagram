'use strict';
(function () {
  // Добавление фотографий в блок .pictures
  function successHandler(arrayPictures) {
    window.render(arrayPictures);
    window.sort(arrayPictures);
  }
  window.backend.load(successHandler, window.utils.showErrorsConnection);
})();
