'use strict';
(function () {
  // Добавление фотографий в блок .pictures
  function loadHandler(arrayPictures) {
    window.render(arrayPictures);
    window.sort(arrayPictures);
  }
  window.backend.load(loadHandler, window.utils.showErrorsConnection);
})();
