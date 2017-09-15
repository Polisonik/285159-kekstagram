'use strict';
(function () {
  function compareLikes(first, second) {
    return (second.likes - first.likes);
  }
  function compareLengthComments(first, second) {
    return (second.comments.length - first.comments.length);
  }
  function compareRandom(a, b) {
    return Math.random() - 0.5;
  }
  function removePictures() {
    var oldPictures = document.querySelectorAll('.picture');

    for (var i = 0; i < oldPictures.length; i++) {
      oldPictures[i].remove();
    }
  }
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
        window.debounce(showRecommend);
      }
      if (target.id === 'filter-popular') {
        window.debounce(showPopular);
      }
      if (target.id === 'filter-random') {
        window.debounce(showRandom);
      }
      if (target.id === 'filter-discussed') {
        window.debounce(showDiscussed);
      }
    }
    function showRecommend() {
      removePictures();
      window.render(array);
    }
    function showPopular() {
      removePictures();
      window.render(array.slice().sort(compareLikes));
    }
    function showRandom() {
      removePictures();
      window.render(array.slice().sort(compareRandom));
    }
    function showDiscussed() {
      removePictures();
      window.render(array.slice().sort(compareLengthComments));
    }
  };
})();
