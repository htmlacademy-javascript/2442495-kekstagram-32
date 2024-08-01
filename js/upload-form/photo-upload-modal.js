import { isEscapeKey } from '../utils.js';
import { isFieldsInFocus, onSubmitForm, uploadForm, pristine } from './pristine-validation.js';
import { resetScale, onSmallerButtonScale, onBiggerButtonScale, biggerButtonScale, smallerButtonScale } from './photo-editing/scale-image.js';
import { resetSliderEffect, init } from './photo-editing/effect-image.js';

const uploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancelButton = imgUploadOverlay.querySelector('.img-upload__cancel');

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isFieldsInFocus()) {
    evt.preventDefault();
    closeUploadForm();
  }
};

// Закрытие модального окна с фото.
function closeUploadForm () {
  uploadForm.reset();
  pristine.reset();
  resetScale();
  resetSliderEffect();
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  //smallerButtonScale.removeEventListener('click', onSmallerButtonScale);
  //biggerButtonScale.removeEventListener('click', onBiggerButtonScale);
  uploadForm.removeEventListener('submit', onSubmitForm);
}

const onImgUploadCancelButton = () => {
  imgUploadCancelButton.addEventListener('click', () => {
    closeUploadForm();
  });
};

// Открытие модального окна с фото.
const openUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  onImgUploadCancelButton();
  init();
  smallerButtonScale.addEventListener('click', onSmallerButtonScale);
  biggerButtonScale.addEventListener('click', onBiggerButtonScale);
  document.addEventListener('keydown', onEscKeydown);
  uploadForm .addEventListener('submit', onSubmitForm);
};

const openUploadModal = () => {
  uploadInput.addEventListener('input', () => {
    openUploadForm();
  });
};


export { openUploadModal };
