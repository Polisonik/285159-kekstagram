'use strict';
(function () {
  window.render = function (data) {
    var elementList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(window.picture(data[i]));
    }
    elementList.appendChild(fragment);
	}
})();