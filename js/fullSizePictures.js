/*import {isEscapeKey} from './utils.js';
import {createSimilarPicturesData, pictures} from './photoPreview.js';
import { createUsersCards } from './photoPreview.js';
//import { generatePostList } from './createData.js';

//const pictures = document.querySelector('.pictures');
const fullSizePicture = document.querySelector('.big-picture');
const closeFullSizePictureButton = fullSizePicture.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

function openPictureModal ({ id, url, description, likes}) {
  fullSizePicture.querySelector('.picture').id = id;
  fullSizePicture.querySelector('big-picture__img img').src = url;
  fullSizePicture.querySelector('.social__caption').textContent = description;
  fullSizePicture.querySelector('likes__count').textContent = likes;
  // fullSizePicture.querySelector('.picture__comments').textContent = comments.length;
  fullSizePicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}


function closePictureModal () {
  fullSizePicture.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
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

closeFullSizePictureButton.addEventListener('click', () => {
  closePictureModal();
});


export { openPictureModal };

/* const openFullSizePicture = () => {
  document.querySelector('.big-picture').classList.remove('hidden');
};


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSizePic();
  }
};

const openFullSizePic = () => {
  fullSizePicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};


const closeFullSizePic = () => {
  fullSizePicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

previewPicture.addEventListener('click', () => {
  openFullSizePic();
});

closeFullSizePicture.addEventListener('click', () => {
  closeFullSizePic();
});
*/
