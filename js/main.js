'use strict';


var getRandomArray = function (min, max) {
  var arr = new Array(max);
  for (var i = 0; i < max; i++) {
    arr[i] = min + i;
  }
  return arr;
};

var shuffleArray = function (a) {
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

function getRandomInt(min, max) {
  var randInt = min + Math.floor(Math.random() * (max - min + 1));
  return randInt;
}

var PHRASES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var NAMES_OPTIONS = ['Иван', 'Николай', 'Владимир', 'Мария', 'Валентина', 'Елена', 'Кекс'];

var MIN_LIKES_COUNT = 15;
var MAX_LIKES_COUNT = 186;

var userName = 0;
var commentMessage = 0;
var avatarUrl = 0;

var commentsArray = [];

for (var i = 0; i < 5; i++) {
  userName = NAMES_OPTIONS[Math.floor(Math.random() * NAMES_OPTIONS.length)];
  commentMessage = PHRASES[Math.floor(Math.random() * PHRASES.length)];
  avatarUrl = 'img/avatar-' + getRandomInt(1, 6) + '.svg';

  commentsArray.push({
    avatar: avatarUrl,
    message: commentMessage,
    name: userName,
  });
}

var shuffledUrlArray = [];
shuffledUrlArray = shuffleArray(getRandomArray(1, 25));

var getSlicedArray = function (arr) {
  var slicedArray = arr.slice(getRandomInt(1, 5));
  return slicedArray;
};

var photos = [];

var photoUrl = 0;
var photoDescription = 0;
var photoComments = 0;

for (i = 0; i < 25; i++) {
  photoUrl = 'photos/' + shuffledUrlArray[i] + '.jpg';
  photoDescription = 'Строка. Описание фотографии';
  photoComments = getSlicedArray(commentsArray);

  photos.push({
    url: photoUrl,
    description: photoDescription,
    likes: getRandomInt(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments: photoComments,
  });
}

var pictureContainer = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPicture = function (photo) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  pictureElement.querySelector('.picture__likes').innerText = photo.likes;

  return pictureElement;
};

document.querySelector('.social__comment-count').classList.add('hidden');
document.querySelector('.comments-loader').classList.add('hidden');
document.querySelector('body').classList.add('modal-open');


var fragment = document.createDocumentFragment();
for (var j = 0; j < photos.length; j++) {
  fragment.appendChild(renderPicture(photos[j]));
}

pictureContainer.appendChild(fragment);

var bigPictureContainer = document.querySelector('.big-picture');

bigPictureContainer.classList.remove('hidden');

var bigPictureImg = document.querySelector('div.big-picture__img img');
var bigPictureLikesCount = document.querySelector('.likes-count');
var bigPictureCommentsCount = document.querySelector('.comments-count');
var bigPictureDescription = document.querySelector('.social__caption');
var bigPictureComments = document.querySelector('.social__comments');

var makeElement = function (tagName, className, text) {
  var element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

var renderBigPicture = function (photo) {
  bigPictureImg.src = photo.url;
  bigPictureCommentsCount.textContent = photo.comments.length;
  bigPictureLikesCount.textContent = photo.likes;
  bigPictureDescription.textContent = photo.description;
  if (photo.comments.length > 0) {
    fragment = document.createDocumentFragment();
    for (i = 0; i < photo.comments.length; i++) {
      var socialComment = makeElement('li', 'social__comment');
      var userPic = makeElement('img', 'social__picture');
      userPic.src = photo.comments[i].avatar;
      userPic.alt = photo.comments[i].name;
      socialComment.appendChild(userPic);
      var socialText = makeElement('p', 'social__text', photo.comments[i].message);
      socialComment.appendChild(socialText);
      fragment.appendChild(socialComment);
    }

    bigPictureComments.appendChild(fragment);
  }
};

renderBigPicture(photos[0]);
var closeBigPicture = document.querySelector('.big-picture__cancel');

closeBigPicture.addEventListener('click', function () {
  bigPictureContainer.classList.add('hidden');
});

var openUploaderForm = document.querySelector('.img-upload__start');
var uploadOverlay = document.querySelector('.img-upload__overlay');

openUploaderForm.addEventListener('click', function (evt) {
  evt.preventDefault();
  uploadOverlay.classList.remove('hidden');
});

var imgUploadCancel = document.querySelector('.img-upload__cancel');
imgUploadCancel.addEventListener('click', function () {
  uploadOverlay.classList.add('hidden');

});
document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    uploadOverlay.classList.add('hidden');
  }
});

var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value');
scaleControlValue.setAttribute('value', '100%');

var MAX_SCALE_VALUE = 100;
var MIN_SCALE_VALUE = 25;
var STEP_VALUE = 25;

var getBiggerScale = function (step) {
  var scaleValue = parseInt(scaleControlValue.value, 10);
  var newScaleValue = scaleValue += step;
  if (newScaleValue >= MAX_SCALE_VALUE) {
    return MAX_SCALE_VALUE + '%';
  }
  return newScaleValue + '%';
};

var getSmallerScale = function (step) {
  var scaleValue = parseInt(scaleControlValue.value, 10);
  var newScaleValue = scaleValue -= step;
  if (newScaleValue <= MIN_SCALE_VALUE) {
    return MIN_SCALE_VALUE + '%';
  }
  return newScaleValue + '%';
};

scaleControlBigger.addEventListener('click', function () {
  scaleControlValue.setAttribute('value', getBiggerScale(STEP_VALUE));
});
scaleControlSmaller.addEventListener('click', function () {
  scaleControlValue.setAttribute('value', getSmallerScale(STEP_VALUE));
});
