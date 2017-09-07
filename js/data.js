'use strict';

(function () {
  addContentPictures();

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
})();
