'use strict';

(function () {
	// добваление в блок picture-comments новых DOM элементов span с комментариями для фотографии
  function addCommentsToPhoto(comments) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < comments.length; i++) {
      var newElement = document.createElement('span');
      newElement.textContent = comments[i];
      fragment.appendChild(newElement);
    }
    return fragment;
  }
  // Заполнение шаблона для одной фотографии
  window.picture = {
    createPhoto: function renderPhoto(picture) {
      var elementTemplate = document.querySelector('#picture-template').content;
      var newElement = elementTemplate.cloneNode(true);

      newElement.querySelector('img').src = picture.url;
      newElement.querySelector('.picture-likes').textContent = picture.likes;
      newElement.querySelector('.picture-comments').appendChild(addCommentsToPhoto(picture.comments));
      return newElement;
    }
  };
})();
