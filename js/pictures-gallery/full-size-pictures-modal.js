import { isEscapeKey } from '../utils/escape-key.js';

const COMMENTS_AT_ONCE = 5;

const fullSizePictureElement = document.querySelector('.big-picture');
const closeFullSizePictureButtonElement = fullSizePictureElement.querySelector('.big-picture__cancel');
const commentTemplateElement = document.querySelector('#social-comment').content.querySelector('.social__comment');
const socialCommentsCountElement = fullSizePictureElement.querySelector('.social__comment-count');
const socialCommentsListElement = fullSizePictureElement.querySelector('.social__comments');
const socialCommentsShown = fullSizePictureElement.querySelector('.social__comment-shown-count');
const socialCommentsTotal = fullSizePictureElement.querySelector('.social__comment-total-count');
const commentsLoaderButton = fullSizePictureElement.querySelector('.social__comments-loader');
let commentsShown = 0;
let comments = [];

// Создание комментария по шаблону.
const generateComment = ({avatar, name, message}) => {
  const commentElement = commentTemplateElement.cloneNode(true);

  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

// Отображение кнопки  'Загрузить еще'.
const setCommentsLoaderButton = () => {
  if (commentsShown >= comments.length) {
    commentsLoaderButton.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }
};

// Отображение комментариев.
const renderComments = () => {
  commentsShown += COMMENTS_AT_ONCE;
  setCommentsLoaderButton();

  const commentsContainer = document.createDocumentFragment();

  for (let i = 0; i < commentsShown; i++) {
    const comment = generateComment(comments[i]);
    commentsContainer.append(comment);
  }
  socialCommentsListElement.innerHTML = '';
  socialCommentsListElement.append(commentsContainer);
  socialCommentsShown.textContent = commentsShown;
  socialCommentsTotal.textContent = comments.length;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};


// Функция по открытию большого фото-поста.

const openBigPicture = () => {
  fullSizePictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

// Функция по закрытию большого фото-поста.
function closePictureModal () {
  fullSizePictureElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
  commentsShown = 0;
  socialCommentsListElement.innerHTML = '';
}

// Отображение поста с фото.
const renderBigPicture = ({ url, description, likes }) => {
  fullSizePictureElement.querySelector('.big-picture__img img').src = url;
  fullSizePictureElement.querySelector('.big-picture__img img').alt = description;
  fullSizePictureElement.querySelector('.social__caption').textContent = description;
  fullSizePictureElement.querySelector('.likes-count').textContent = likes;
};

// Обработчик на закрытие полноразмерного поста.

const onCloseFullSizePictureButton = () => {
  closeFullSizePictureButtonElement.addEventListener('click', () => {
    closePictureModal();
  });

};

const onCommentsLoaderButton = () => {
  commentsLoaderButton.addEventListener('click', renderComments);
};

// Функция открытия полноразмерного поста.

const openPictureModal = (data) => {
  openBigPicture();
  renderBigPicture(data);
  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
    onCommentsLoaderButton();
  } else {
    socialCommentsCountElement.classList.add('hidden');
    setCommentsLoaderButton();
  }
  document.addEventListener('keydown', onDocumentKeydown);
  onCloseFullSizePictureButton();
};

export { openPictureModal, closePictureModal };
