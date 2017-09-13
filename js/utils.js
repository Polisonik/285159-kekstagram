'use strict';
(function () {
  window.utils = {
    ESC: 27,
    ENTER: 13,
    PERCENT: 100,
    getRandomNumber: function (min, max) { // Генерация случайного целого числа из диапазоана [min, max];
      return min + Math.floor(Math.random() * (max + 1 - min));
    },
		showErrorMessage: function (errorMessage){
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
