'use strict';

(function () {
  addContentPictures();
  closeUploadOverlay();
  controlGallery();
	controlUploadOvelrlay();
  // добваление в блок picture-comments новых DOM элементов span с комментариями
  function addCommentsToPhoto(comments) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < comments.length; i++) {
      var newElement = document.createElement('span');
      newElement.textContent = comments[i];
      fragment.appendChild(newElement);
    }
    return fragment;
  }
  // Заполнение шаблона для одной фотографии
  function renderPhoto(picture) {
    var elementTemplate = document.querySelector('#picture-template').content;
    var newElement = elementTemplate.cloneNode(true);

    newElement.querySelector('img').src = picture.url;
    newElement.querySelector('.picture-likes').textContent = picture.likes;
    newElement.querySelector('.picture-comments').appendChild(addCommentsToPhoto(picture.comments));
    return newElement;
  }
  // Добавление созданных DOM-элементов в блок .pictures
  function addContentPictures() {
    var arrayPictures = generationPhotosDescription();
    var numberPhotos = 25;
    var elementList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < numberPhotos; i++) {
      fragment.appendChild(renderPhoto(arrayPictures[i]));
    }
    elementList.appendChild(fragment);
  }
  // Скрытие формы кадрирования изображения
  
  // Генерация случайного целого числа из диапазоана [min, max];
  function getRandomNumber(min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
  }
  // Генерация массива адресов картинок
  function getUrl() {
    var array = [];
    var maxNumber = 25;

    for (var i = 1; i <= maxNumber; i++) {
      array.push('photos/' + i + '.jpg');
    }
    return array;
  }
  // Генерация количества лайков в диапазоне [15, 200];
  function getLikesNumber() {
    var minNumber = 15;
    var maxNumber = 200;

    return getRandomNumber(minNumber, maxNumber);
  }
  // Генерация комментариев;
  function getComments() {
    var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
    var commentsCount = getRandomNumber(1, 2); // возвращает случайное значение: 1 - 1 комментарии к фотографии, 2 - два комментария к фотографии;
    var maxNumberComments = 2;
    var indexFirst = getRandomNumber(0, comments.length - 1);
    var photoComments = [];
    var firstComments = comments[indexFirst];
    photoComments.push(firstComments);
    comments.splice(indexFirst, 1);

    if (commentsCount === maxNumberComments) {
      var IndexSecond = getRandomNumber(0, comments.length - 1);
      photoComments.push(comments[IndexSecond]);
    }
    return photoComments;
  }
  // Заполнение массива из 25 объектов c описанием фотографий пользователей
  function generationPhotosDescription() {
    var photoNumber = 25;
    var photos = [];
    var urlPhotos = getUrl();

    urlPhotos.sort(compareRandom); // случайная перестановка элементов массива
    for (var i = 0; i < photoNumber; i++) {
      photos.push({url: urlPhotos[i], likes: getLikesNumber(), comments: getComments()});
    }
    return photos;
  }
  // Функция сравнения для получения случйной перестановки элементов массива
  function compareRandom(a, b) {
    return Math.random() - 0.5;
  }
  // Функция
  function controlGallery() {
    var openGallery = document.querySelector('.pictures');
    openGallery.addEventListener('click', onClikPhoto);
    openGallery.addEventListener('keydown', onKeydownEnterPhoto);
  }
	// Открытие просмотра фотографии и добавлени обработчиков событий
  function openPopup() {
    var gallery = document.querySelector('.gallery-overlay');
    var closePhoto = gallery.querySelector('.gallery-overlay-close');

    gallery.classList.remove('hidden');
    document.addEventListener('keydown', onKeydownEsc);
    closePhoto.addEventListener('click', onClickCross);
    closePhoto.addEventListener('keydown', onKeydownEnterCross);
  }
	// Закрытие режима просмотра фотографии и удаление обработчиков событий
  function closePopup() {
    var gallery = document.querySelector('.gallery-overlay');
    var closePhoto = gallery.querySelector('.gallery-overlay-close');

    gallery.classList.add('hidden');
    document.removeEventListener('keydown', onKeydownEsc);
    closePhoto.removeEventListener('click', onClickCross);
    closePhoto.removeEventListener('keydown', onKeydownEnterCross);
  }
  // Получение данных о фоторгафии при событии на теге img
  function getDataOfPhoto(event) {
    var target = event.target;
    var src = target.src;
    var linkCount = target.nextElementSibling.lastElementChild.textContent;
    var commentsCount = target.nextElementSibling.firstElementChild.children.length;

    prepareDescriptionPhoto(src, linkCount, commentsCount);
  }
  // Получение данных о фоторгафии при событии на теге a
  function getDataOfPhotoAlternative(event) {
    var target = event.target;
    var src = target.firstElementChild.src;
    var linkCount = target.lastElementChild.lastElementChild.textContent;
    var commentsCount = target.lastElementChild.firstElementChild.children.length;

    prepareDescriptionPhoto(src, linkCount, commentsCount);
  }
  // Заполнение описания фотографии для режима просмотра
  function prepareDescriptionPhoto(url, linkCount, commentsCount) {
    var gallery = document.querySelector('.gallery-overlay');

    gallery.querySelector('.gallery-overlay-image').src = url;
    gallery.querySelector('.likes-count').textContent = linkCount;
    gallery.querySelector('.comments-count').textContent = commentsCount;
  }
	// Обработка события нажатия на Esc при отрытом режиме просмотра фотографии
  function onKeydownEsc(event) {
    var ESC = 27;
    if (event.keyCode === ESC) {
      closePopup();
    }
  }
  // Обработка события клика мыши на миниатюру фотографии
  function onClikPhoto(event) {
    var target = event.target;
    if (target.tagName !== 'IMG') {
      return;
    }
    event.preventDefault();
    getDataOfPhoto(event);
    openPopup();
  }
  // Обработка события клика на крестик для закрытия режима просмотра фотографии
  function onClickCross(event) {
    event.preventDefault();
    closePopup();
  }
  // Обработка события нажатия Enter на миниатюру фотографии
  function onKeydownEnterPhoto(event) {
    event.preventDefault();
    var ENTER = 13;
    var target = event.target;
    if (event.keyCode === ENTER) {
      if (target.tagName === 'IMG') {
        getDataOfPhoto(event);
        openPopup();
      } else if (target.tagName === 'A') {
        getDataOfPhotoAlternative(event);
        openPopup();
      }
    }
  }
  // Обработка события нажатия клавиши Enter для закрытия режима просмотра фотографии
  function onKeydownEnterCross(event) {
    event.preventDefault();
    var ENTER = 13;
    if (event.keyCode === ENTER) {
      closePopup();
    }
  }
	// Работа с окном кадрирования 
	function controlUploadOvelrlay() {
		var form = document.querySelector('#upload-select-image');
		var uploadFile = form.querySelector('#upload-file');
		
		uploadFile.addEventListener('change', onInputFile)
	}
	function onInputFile() {
		openUploadOverlay();
	}
	function openUploadOverlay() {
		var uploadOverlay = document.querySelector('.upload-overlay');
		var uploadCansel = uploadOverlay.querySelector('.upload-form-cancel');
		
		controlResize();		
		uploadOverlay.classList.remove('hidden');
		document.addEventListener('keydown', onKeydownEsc);
		uploadCansel.addEventListener('click', onClickCansel);
		uploadCansel.addEventListener('keydown', onKeydownEnterCansel);
		
	}
	function closeUploadOverlay() {
    var uploadOverlay = document.querySelector('.upload-overlay');
		var uploadCansel = uploadOverlay.querySelector('.upload-form-cancel');
		var buttonDecrease = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
		var buttonIncrease =uploadOverlay.querySelector('.upload-resize-controls-button-inc');
		
    uploadOverlay.classList.add('hidden');
		
		document.removeEventListener('keydown', onKeydownEsc);
		uploadCansel.removeEventListener('click', onClickCansel);
		uploadCansel.removeEventListener('keydown', onKeydownEnterCansel);
		buttonDecrease.removeEventListener('click', onClickDesrease);
		buttonDecrease.removeEventListener('keydown', onKeydownEnterDesrease);
		buttonIncrease.removeEventListener('click', onClickIncrease);
		buttonIncrease.removeEventListener('keydown', onKeydownEnterIncrease);
	
  }
	function onKeydownEsc(event) {
		var ESC = 27;
		var descriptionPhoot = document.querySelector('.upload-form-description')
		if(event.keyCode === ESC && descriptionPhoot != document.activeElement) {
			closeUploadOverlay();
		}
	}
	function onClickCansel() {
		closeUploadOverlay();
	}
	function onKeydownEnterCansel(event) {
		var ENTER = 13;
		if (event.keyCode === ENTER) {
			closeUploadOverlay();
		}
	}
	// Изменение масштаба фотографии 
	function controlResize() {
		var uploadResize = document.querySelector('.upload-resize-controls');
		var buttonDecrease = uploadResize.querySelector('.upload-resize-controls-button-dec');
		var buttonIncrease =uploadResize.querySelector('.upload-resize-controls-button-inc');
		
		buttonDecrease.addEventListener('click', onClickDesrease);
		buttonDecrease.addEventListener('keydown', onKeydownEnterDesrease);
		buttonIncrease.addEventListener('click', onClickIncrease);
		buttonIncrease.addEventListener('keydown', onKeydownEnterIncrease);
	}	
	// Функция уменьшнния значения масштаба 
	function getValueDesrease() {
		var uploadResize = document.querySelector('.upload-resize-controls');
		var buttonDecrease = uploadResize.querySelector('.upload-resize-controls-button-dec');
		var inputData = uploadResize.querySelector('.upload-resize-controls-value');
		var initialValue = parseInt(inputData.value);
		var min = 25;
		var step = 25;
		var value = initialValue - step;
		
		if (value < min) {
			value = min;
		}
		inputData.value = value + '%';
		return value;
	}
	// Функция увеличения значения масштаба 
	function getValueIncrease() {
		var uploadResize = document.querySelector('.upload-resize-controls');
		var buttonDecrease = uploadResize.querySelector('.upload-resize-controls-button-dec');
		var inputData = uploadResize.querySelector('.upload-resize-controls-value');
		var initialValue = parseInt(inputData.value);
		var max = 100;
		var step = 25;
		var value = initialValue + step;
		
		if (value > max) {
			value = max;
		}		
		inputData.value = value + '%';
		return value;
	}
	function onClickDesrease() {
		getValueDesrease();
		resizeScale();
	}
	function onClickIncrease() {
		getValueIncrease();
		resizeScale();
	}
	function onKeydownEnterDesrease(event) {
		var ENTER = 13;
		if (event.keyCode === ENTER) {
			getValueDesrease();
			resizeScale();
		}
	}
	function onKeydownEnterIncrease(event) {
		var ENTER = 13;
		if (event.keyCode === ENTER) {
			getValueIncrease();
			resizeScale();
		}
	}
	// Функция изменения мастштаба фотографии
	function resizeScale() {
		var uploadOverlay = document.querySelector('.upload-overlay');
		var photo = uploadOverlay.querySelector('.effect-image-preview');
		var scaleInput = uploadOverlay.querySelector('.upload-resize-controls-value').value;
		var persent = 100;
		photo.style.transform = 'scale(' + parseInt(scaleInput) / 100 +')';
	}	
})();
