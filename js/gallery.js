'use strict';
// в функцию нужно передать массив с данными о фотографиях и вызвать функцию создания dom-элемента для одной фотогрфии.
(function () {
  // Добавление фотографий в блок .pictures
	function successHandler (arrayPictures) {
    var elementList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arrayPictures.length; i++) {
      fragment.appendChild(window.picture.createPhoto(arrayPictures[i]));
    }
    elementList.appendChild(fragment);
	}
	function errorHandler(errorMessage) {
		var node = document.createElement('div');
		node.style.zIndex = '100';
		node.style.margin = '0 auto';
		node.style.textAlign = 'center';
		node.style.background = 'grey';
		node.style.color = 'red';
		node.style.position = 'absolute';
		node.style.left = 0;
		node.style.right = 0;
		node.style.fontSize = '30px';
		node.textContent = errorMessage;
		document.body.insertAdjacentElement('afterbegin', node);
	}
	window.backend.load(successHandler, errorHandler)
})();
