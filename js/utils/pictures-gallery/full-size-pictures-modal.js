import { isEscapeKey } from '../escape-key.js';

const COMMENTS_AT_ONCE = 5;
const fullSizePicture = document.querySelector('.big-picture');
const closeFullSizePictureButton = fullSizePicture.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#social-comment').content.querySelector('.social__comment');
const socialCommentsCount = fullSizePicture.querySelector('.social__comment-count');
const socialCommentsList = fullSizePicture.querySelector('.social__comments');
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
  socialCommentsList.innerHTML = '';
}

// Отображение поста с фото.
const renderBigPicture = ({ url, description, likes }) => {
  fullSizePicture.querySelector('.big-picture__img img').src = url;
  fullSizePicture.querySelector('.big-picture__img img').alt = description;
  fullSizePicture.querySelector('.social__caption').textContent = description;
  fullSizePicture.querySelector('.likes-count').textContent = likes;
};

// Обработчик на закрытие полноразмерного поста.

const onCloseFullSizePictureButton = () => {
  closeFullSizePictureButton.addEventListener('click', () => {
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
    socialCommentsCount.classList.add('hidden');
    setCommentsLoaderButton();
  }
  document.addEventListener('keydown', onDocumentKeydown);
  onCloseFullSizePictureButton();
};

export { openPictureModal, closePictureModal };
