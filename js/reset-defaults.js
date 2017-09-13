'use strict';
(function () {
  function showToggle() {
    document.querySelector('.upload-effect-level-pin').style.display = 'block';
    document.querySelector('.upload-effect-level-pin').style.left = '20%';
    document.querySelector('.upload-effect-level-val').style.width = '20%';
  }
  function hideToggle() {
    document.querySelector('.upload-effect-level-pin').style.display = 'none';
    document.querySelector('.upload-effect-level-val').style.width = '0%';
  }
  window.resetDefaults = { 
		resetEffect: function (photo) {
      var defaultClass = 'effect-image-preview';
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
		resetForm: function() {
      var defaultData = {
        hashteg: '',
        comments: '',				
        scale: '55%',
        imageClass: 'effect-image-preview'
      }
	    var form = document.querySelector('.upload-form');
	    var checkedInputDefault = form.querySelector('#upload-effect-none');
      var checkedInputCurrent = form.querySelector('input[name="effect"]:checked');

      form.querySelector('.upload-resize-controls-value').value =defaultData.scale;
      form.querySelector('.effect-image-preview').style.transform = 'none';
      form.querySelector('.effect-image-preview').style.filter = 'none';
      form.querySelector('.effect-image-preview').className = defaultData.imageClass;
      form.querySelector('.upload-form-hashtags').value = defaultData.hashteg;
      form.querySelector('.upload-form-description').value = defaultData.comments;
      form.querySelector('.upload-effect-level-pin').style.display = 'none';
      form.querySelector('.upload-effect-level-val').style.width = '0%';

      if (checkedInputCurrent.id != 'upload-effect-none') {
        checkedInputCurrent.checked = false;
        checkedInputDefault.checked = true;
		  }
		}
  };
})();
