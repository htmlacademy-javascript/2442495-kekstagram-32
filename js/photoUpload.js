import { isEscapeKey } from './utils';
import { isFieldsInFocus, onSubmitForm, uploadForm, pristine } from './pristineValidation.js';

const uploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancelButton = imgUploadOverlay.querySelector('.img-upload__cancel');

const onUploadKeydown = (evt) => {
  if (isEscapeKey(evt) && !isFieldsInFocus()) {
    evt.preventDefault();
    closeUploadForm();
  }
};

// Открытие модального окна с фото.
const openUploadForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadKeydown);
  uploadForm .addEventListener('submit', onSubmitForm);
};

// Закрытие модального окна с фото.
function closeUploadForm () {
  uploadForm.reset();
  pristine.reset();
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadKeydown);
  uploadForm.removeEventListener('submit', onSubmitForm);
}

const onImgUploadCancelButton = () => {
  imgUploadCancelButton.addEventListener('click', () => {
    closeUploadForm();
  });
};


const openUploadModal = () => {
  uploadInput.addEventListener('input', () => {
    openUploadForm();
  });
  onImgUploadCancelButton();
};


export { openUploadModal, uploadInput, onUploadKeydown, closeUploadForm };
