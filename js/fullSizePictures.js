import { isEscapeKey } from './utils.js';

const fullSizePicture = document.querySelector('.big-picture');
const closeFullSizePictureButton = fullSizePicture.querySelector('.big-picture__cancel');
const socialCommentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#social-comment').content.querySelector('.social__comment');
const COMMENTS_AT_ONCE = 5;
const socialCommentsShown = fullSizePicture.querySelector('.social__comment-shown-count');
const socialCommentsTotal = fullSizePicture.querySelector('.social__comment-total-count');
const commentsLoaderButton = fullSizePicture.querySelector('.social__comments-loader');
let commentsShown = 0;
let comments = [];

// Создание комментария по шаблону.
const generateComment = ({avatar, name, message}) => {
  const commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

// Отображение комментариев.
const renderComments = () => {
  commentsShown += COMMENTS_AT_ONCE;
  if (commentsShown > comments.length) {
    commentsLoaderButton.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }

  const commentsContainer = document.createDocumentFragment();

  for (let i = 0; i < commentsShown; i++) {
    const comment = generateComment(comments[i]);
    commentsContainer.append(comment);
  }
  socialCommentsList.innerHTML = '';
  socialCommentsList.append(commentsContainer);
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
  fullSizePicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

// Функция по закрытию большого фото-поста.
function closePictureModal () {
  fullSizePicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
  commentsShown = 0;
}

// Отображение поста с фото.
const renderBigPicture = ({ url, description, likes }) => {
  fullSizePicture.querySelector('.big-picture__img img').src = url;
  fullSizePicture.querySelector('.big-picture__img img').alt = description;
  fullSizePicture.querySelector('.social__caption').textContent = description;
  fullSizePicture.querySelector('.likes-count').textContent = likes;
};

// Обработчик на закрытие полноразмерного поста.

const oncloseFullSizePictureButton = () => {
  closeFullSizePictureButton.addEventListener('click', () => {
    closePictureModal();
  });

};

const onCommentsLoaderButton = () => {
  commentsLoaderButton.addEventListener('click', renderComments);
};

// Функция открытия полноразмерного поста.

function openPictureModal (data) {
  openBigPicture();
  renderBigPicture(data);
  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
  }
  document.addEventListener('keydown', onDocumentKeydown);
  oncloseFullSizePictureButton();
  onCommentsLoaderButton();
}

export { openPictureModal };
