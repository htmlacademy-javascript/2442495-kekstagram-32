import { generatePostList } from './createData';
import {isEscapeKey} from './utils.js';

const pictures = document.querySelector('.pictures');
const picturePreviewTemplate = document.querySelector('#picture').content.querySelector('.picture');
const createSimilarPicturesData = generatePostList();
const fullSizePicture = document.querySelector('.big-picture');
const closeFullSizePictureButton = fullSizePicture.querySelector('.big-picture__cancel');

//const previewPicture = document.querySelector('.picture');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

// Создаем миниатюры постов.

const createUsersCards = () => {
  const picturesContainer = document.createDocumentFragment();
  createSimilarPicturesData.forEach(({ id, url, description, likes, comments}) => {
    const pictureElement = picturePreviewTemplate.cloneNode(true);
    pictureElement.id = id;
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    picturesContainer.appendChild(pictureElement);
  });
  pictures.appendChild(picturesContainer);
};


// Функция открытия полноразмерного фото.

function openPictureModal ({ url, description, likes}) {
  fullSizePicture.querySelector('.big-picture__img img').src = url;
  fullSizePicture.querySelector('.social__caption').textContent = description;
  fullSizePicture.querySelector('.likes-count').textContent = likes;
  fullSizePicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

pictures.addEventListener('click', (e) => {
  if (e.target.closest('.picture')){
    const correctId = e.target.closest('.picture').id;
    const correctPictureId = createSimilarPicturesData.find(
      (item) => String(item.id) === String(correctId)
    );
    openPictureModal(correctPictureId);
  }
});


const closePictureModal = () => {
  fullSizePicture.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
};


closeFullSizePictureButton.addEventListener('click', () => {
  closePictureModal();
});

export { createUsersCards };
export {createSimilarPicturesData, pictures };
