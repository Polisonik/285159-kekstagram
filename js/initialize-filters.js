'use strict';
(function () {
	var changeFilter = null;
	function initialize(blockEffect) {
	  blockEffect.addEventListener('click', onClickEffect);
	}
	function onClickEffect(event) {
    var target = event.target;
    var filterName = target.value;
    var defaultClass = 'effect-image-preview';

    if (target.tagName !== 'INPUT') {
      return;
    }
    if (typeof changeFilter === 'function') {
			changeFilter(defaultClass, filterName);
		}
	}
	
  window.initializeFilters = {
		apply: function( filterElement, callback) {
			initialize(filterElement);
      changeFilter = callback; // photo.className = defaultClass + ' ' + 'effect-' + filterName;
		}
	}	
})();
