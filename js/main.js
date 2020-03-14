'use strict';


var getRandomArray = function (min, max) {
  var arr = new Array(max);
  for (var i = 0; i < max; i++) {
    arr[i] = min + i;
  }
  return arr;
};

var shuffle = function (a) {
  var j;
  var x;
  var i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

var getRandomAmount = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var phrases = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var namesOptions = ['Иван', 'Николай', 'Владимир', 'Мария', 'Валентина', 'Елена', 'Кекс'];

var userName = 0;
var commentMessage = 0;
var avatarUrl = 0;

var commentsArray = [];

for (var i = 0; i < 5; i++) {
  userName = namesOptions[Math.floor(Math.random() * namesOptions.length)];
  commentMessage = phrases[Math.floor(Math.random() * phrases.length)];
  avatarUrl = 'img/avatar-' + getRandomAmount(6) + '.svg';

  commentsArray.push({
    avatar: avatarUrl,
    message: commentMessage,
    name: userName,
  });
}

var shuffledUrlArray = [];
shuffledUrlArray = shuffle(getRandomArray(1, 25));
var shuffledLikesArray = [];
shuffledLikesArray = shuffle(getRandomArray(15, 186));

var photos = [];

var photoUrl = 0;
var photoDescription = 0;
var photoLikes = 0;
var photoComments = 0;

for (i = 0; i < 25; i++) {
  photoUrl = 'photos/' + shuffledUrlArray[3] + '.jpg';
  photoLikes = shuffledLikesArray[3];
  photoDescription = 'Строка. Описание фотографии';
  photoComments = commentsArray[Math.floor(Math.random() * commentsArray.length)];

  photos.push({
    url: photoUrl,
    description: photoDescription,
    likes: photoLikes,
    comments: photoComments,
  });
}

var pictureContainer = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

for (i = 0; i < photos.length; i++) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = 'photos/1.jpg';

  pictureContainer.appendChild(pictureElement);
}


/**
var renderPicture = function () {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photos.url;
  pictureElement.querySelector('.picture__comments').textContent = photos.comments;
  // pictureElement.querySelector('.picutre__likes').textContent = photos.likes;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < photos.length; j++) {
  fragment.appendChild(renderPicture(photos[j]));
};

pictureContainer.appendChild(fragment);
*/
