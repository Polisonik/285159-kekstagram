(function(){
	window.sort = function(data) {
		var array = data;
		var filters = document.querySelector('.filters');
		filters.addEventListener('change', onChange);
		
		function onChange(event) {
			var target = event.target;
			if (target.tagName !== 'INPUT') {
        return;
      };
			if (target.id === 'filter-recommend') {
				updatePictures(array);
			}
			
			if (target.id === 'filter-popular') {
				var arrayOfPopular = array.slice().sort(compareLikes);
				console.log(arrayOfPopular);
				updatePictures(arrayOfPopular);
			}
			
		}
		function compareLikes (first,second) {
			return (second.likes - first.likes )
		}
		function updatePictures(newArray) {
			var oldPictures = document.querySelectorAll('.picture');
			for (var i = 0; i < oldPictures.length; i++) {
        oldPictures[i].remove();
      }
			window.render(newArray);
		}
		
	}
})();