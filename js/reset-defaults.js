'use strict';
(function () {
  var form = document.querySelector('.upload-form');
  var defaultClass = 'effect-image-preview';
  var toggle = document.querySelector('.upload-effect-level-pin');
  var bar = document.querySelector('.upload-effect-level-val');
  var hashtag = form.querySelector('.upload-form-hashtags');
  var comments = form.querySelector('.upload-form-description');

  function showToggle() {
    toggle.style.display = 'block';
    toggle.style.left = '20%';
    bar.style.width = '20%';
  }
  function hideToggle() {
    toggle.style.display = 'none';
    bar.style.width = '0%';
  }
  window.resetDefaults = {
    resetEffect: function (photo) {
      var effectByDefault = {
        none: 'none',
        chrome: 'grayscale(1)',
        sepia: 'sepia(1)',
        marvin: 'invert(100%)',
        phobos: 'blur(5px)',
        heat: 'brightness(3)'
      };

      if (photo.classList.contains('effect-chrome')) {
        photo.style.filter = effectByDefault.chrome;
        showToggle();
      } else if (photo.classList.contains('effect-sepia')) {
        photo.style.filter = effectByDefault.sepia;
        showToggle();
      } else if (photo.classList.contains('effect-marvin')) {
        photo.style.filter = effectByDefault.marvin;
        showToggle();
      } else if (photo.classList.contains('effect-phobos')) {
        photo.style.filter = effectByDefault.phobos;
        showToggle();
      } else if (photo.classList.contains('effect-heat')) {
        photo.style.filter = effectByDefault.heat;
        showToggle();
      } else if (photo.classList.contains('effect-none') || photo.className === defaultClass) {
        photo.style.filter = effectByDefault.none;
        hideToggle();
      }
    },
    resetForm: function () {
      var picture = form.querySelector('.effect-image-preview');
      var scale = form.querySelector('.upload-resize-controls-value');
      var defaultData = {
        hashtag: '',
        comments: '',
        scale: '100%',
      };
      var checkedInputDefault = form.querySelector('#upload-effect-none');
      var checkedInputCurrent = form.querySelector('input[name="effect"]:checked');

      window.validate.removeErrors(comments, hashtag, form);
      scale.value = defaultData.scale;
      picture.style.transform = 'none';
      picture.style.filter = 'none';
      picture.className = defaultClass;
      hashtag.value = defaultData.hashtag;
      comments.value = defaultData.comments;
      toggle.style.display = 'none';
      bar.style.width = '0%';

      if (checkedInputCurrent.id !== 'upload-effect-none') {
        checkedInputCurrent.checked = false;
        checkedInputDefault.checked = true;
      }
    }
  };
})();
