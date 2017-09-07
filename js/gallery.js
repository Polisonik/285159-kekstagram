'use strict';

(function () {
  controlGallery();

  function controlGallery() {
    var openGallery = document.querySelector('.pictures');
    openGallery.addEventListener('click', onClikPhoto);
    openGallery.addEventListener('keydown', onKeydownEnterPhoto);
  }
	// Открытие просмотра фотографии и добавлени обработчиков событий
  function openPopup() {
    var gallery = document.querySelector('.gallery-overlay');
    var closePhoto = gallery.querySelector('.gallery-overlay-close');

    gallery.classList.remove('hidden');
    document.addEventListener('keydown', onKeydownEsc);
    closePhoto.addEventListener('click', onClickCross);
    closePhoto.addEventListener('keydown', onKeydownEnterCross);
  }
	// Закрытие режима просмотра фотографии и удаление обработчиков событий
  function closePopup() {
    var gallery = document.querySelector('.gallery-overlay');
    var closePhoto = gallery.querySelector('.gallery-overlay-close');

    gallery.classList.add('hidden');
    document.removeEventListener('keydown', onKeydownEsc);
    closePhoto.removeEventListener('click', onClickCross);
    closePhoto.removeEventListener('keydown', onKeydownEnterCross);
  }
  // Получение данных о фоторгафии при событии на теге img
  function getDataOfPhoto(event) {
    var target = event.target;
    var src = target.src;
    var linkCount = target.nextElementSibling.lastElementChild.textContent;
    var commentsCount = target.nextElementSibling.firstElementChild.children.length;

    prepareDescriptionPhoto(src, linkCount, commentsCount);
  }
  // Получение данных о фоторгафии при событии на теге a
  function getDataOfPhotoAlternative(event) {
    var target = event.target;
    var src = target.firstElementChild.src;
    var linkCount = target.lastElementChild.lastElementChild.textContent;
    var commentsCount = target.lastElementChild.firstElementChild.children.length;

    prepareDescriptionPhoto(src, linkCount, commentsCount);
  }
  // Заполнение описания фотографии для режима просмотра
  function prepareDescriptionPhoto(url, linkCount, commentsCount) {
    var gallery = document.querySelector('.gallery-overlay');

    gallery.querySelector('.gallery-overlay-image').src = url;
    gallery.querySelector('.likes-count').textContent = linkCount;
    gallery.querySelector('.comments-count').textContent = commentsCount;
  }
	// Обработка события нажатия на Esc при отрытом режиме просмотра фотографии
  function onKeydownEsc(event) {
    var ESC = 27;
    if (event.keyCode === ESC) {
      closePopup();
    }
  }
  // Обработка события клика мыши на миниатюру фотографии
  function onClikPhoto(event) {
    var target = event.target;
    if (target.tagName !== 'IMG') {
      return;
    }
    event.preventDefault();
    getDataOfPhoto(event);
    openPopup();
  }
  // Обработка события клика на крестик для закрытия режима просмотра фотографии
  function onClickCross(event) {
    event.preventDefault();
    closePopup();
  }
  // Обработка события нажатия Enter на миниатюру фотографии
  function onKeydownEnterPhoto(event) {
    event.preventDefault();
    var ENTER = 13;
    var target = event.target;
    if (event.keyCode === ENTER) {
      if (target.tagName === 'IMG') {
        getDataOfPhoto(event);
        openPopup();
      } else if (target.tagName === 'A') {
        getDataOfPhotoAlternative(event);
        openPopup();
      }
    }
  }
  // Обработка события нажатия клавиши Enter для закрытия режима просмотра фотографии
  function onKeydownEnterCross(event) {
    event.preventDefault();
    var ENTER = 13;
    if (event.keyCode === ENTER) {
      closePopup();
    }
  }
})();
