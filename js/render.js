'use strict';
(function () {
  window.render = function (data) {
    var elementList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    data.forEach(function (item) {
      fragment.appendChild(window.picture(item));
    });
    elementList.appendChild(fragment);
  };
})();
