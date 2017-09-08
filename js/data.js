'use strict';
(function () {
  // Генерация случайного целого числа из диапазоана [min, max];
  function getRandomNumber(min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
  }
  // Генерация массива адресов картинок
  function getUrl() {
    var array = [];
    var maxNumber = 25; //

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
	// Функция сравнения для получения случйной перестановки элементов массива
  function compareRandom(a, b) {
    return Math.random() - 0.5;
  }
  // Заполнение массива из 25 объектов c описанием фотографий пользователей
  window.data = {
    getData: function generationPhotosDescription() {
      var photoNumber = 25;
      var photos = [];
      var urlPhotos = getUrl();

      urlPhotos.sort(compareRandom); // случайная перестановка элементов массива
      for (var i = 0; i < photoNumber; i++) {
        photos.push({url: urlPhotos[i], likes: getLikesNumber(), comments: getComments()});
      }
      return photos;
    }
  };
})();
