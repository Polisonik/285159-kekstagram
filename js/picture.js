'use strict';
(function () {
  // Заполнение шаблона для одной фотографии
  window.picture = function (picture) {
    var elementTemplate = document.querySelector('#picture-template').content;
    var newElement = elementTemplate.cloneNode(true);

    newElement.querySelector('img').src = picture.url;
    newElement.querySelector('.picture-likes').textContent = picture.likes;
    newElement.querySelector('.picture-comments').textContent = picture.comments.length;
    return newElement;
  };
})();
