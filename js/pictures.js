'use strict';

closeUploadOverlay();
addContentPictures ();
openGallery();

// Заполнение шаблона для одной фотографии
function renderPhoto(picture) {	
	var elementTemplate = document.querySelector('#picture-template').content;
	var newElement = elementTemplate.cloneNode(true);
	
	newElement.querySelector('img').src = picture['url'];
	newElement.querySelector('.picture-likes').textContent = picture['likes'];
	newElement.querySelector('.picture-comments').textContent = picture['comments'];
	
	return newElement;
}
//Добавление созданные DOM-элементов в блок .pictures
function addContentPictures () {
	var arrayPictures = generationPhotosDescription();
	var numberPhotos = 25;
  var elementList = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
	
  for (var i = 0; i < numberPhotos; i++) {
	  fragment.appendChild(renderPhoto(arrayPictures[i]));
  }
  elementList.appendChild(fragment);
	
	// Вывод первой картинки из сгенерированного массива в блок
	document.querySelector('.gallery-overlay-image').src = arrayPictures[0]['url'] ;
  document.querySelector('.likes-count').textContent = arrayPictures[0]['likes'];
  document.querySelector('.comments-count').textContent = arrayPictures[0]['comments'];
}

// Открытие элемента gallery-overlay
function openGallery() {
  var galleryOverlay = document.querySelector('.gallery-overlay');
	
	galleryOverlay.classList.remove('hidden')
} 
//Скрытие формы кадрирования изображения
function closeUploadOverlay() {
  var uploadOverlay = document.querySelector('.upload-overlay');
	
	uploadOverlay.classList.add('hidden');
};

//Генерация случайного целого числа из диапазоана [min, max];
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
	var l = getRandomNumber(15, 200);
  return l;	
}
// Генерация комментариев;
function getComments() {
  var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!']
  var choice = getRandomNumber(0, 1); //возвращает случайное значение: 0 - 2 комментария к фотографии, 1 - один комментарий к фотографии; 
  var indexFirst = getRandomNumber(0, comments.length - 1);
  var photoComments;
  var fistComments = comments[indexFirst]

  if (choice) {
	  photoComments = fistComments;
  } else {
	  comments.splice(indexFirst, 1);
	  var IndexSecond = getRandomNumber(0, comments.length - 1);
	  photoComments = fistComments + '/n' + comments[IndexSecond];
  }
  return photoComments;	
}
// Заполнение массива из 25 объектов, которые описывают фотографии пользователей
function generationPhotosDescription() {
	var photoNumber = 25;
  var photos = [];
	var urlPhotos = getUrl();
	
	urlPhotos.sort(compareRandom);
  for (var i = 0; i < photoNumber; i++) {
	  photos.push({url: urlPhotos[i], likes: getLikesNumber(), comments: getComments() });
	}
	return photos;	
}
// Функция сравнения для получения случйной перестановки элементов массива
function compareRandom(a, b) {
  return Math.random() - 0.5;
}
