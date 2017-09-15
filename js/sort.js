'use strict';
(function () {
  window.sort = function (data) {
    var array = data;
    var filters = document.querySelector('.filters');

    filters.addEventListener('click', onChange);

    function onChange(event) {
      var target = event.target;

      if (target.tagName !== 'INPUT') {
        return;
      }
      if (target.id === 'filter-recommend') {
        updatePictures(array);
      }
      if (target.id === 'filter-popular') {
        updatePictures(array.slice().sort(compareLikes));
      }
      if (target.id === 'filter-random') {
        updatePictures(array.slice().sort(compareRandom));
      }
      if (target.id === 'filter-discussed') {
        updatePictures(array.slice().sort(compareLengthComments));
      }
    }
    function compareLikes(first, second) {
      return (second.likes - first.likes);
    }
    function compareLengthComments(first, second) {
      return (second.comments.length - first.comments.length);
    }
    function updatePictures(newArray) {
      var oldPictures = document.querySelectorAll('.picture');

      for (var i = 0; i < oldPictures.length; i++) {
        oldPictures[i].remove();
      }
      window.render(newArray);
    }
    function compareRandom(a, b) {
      return Math.random() - 0.5;
    }
  };
})();
