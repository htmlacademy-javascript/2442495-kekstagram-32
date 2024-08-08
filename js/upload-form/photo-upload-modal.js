import { isEscapeKey } from '../utils/escape-key.js';
import { isFieldsInFocus, uploadFormElement, pristine } from './pristine-validation.js';
import { resetScale, onSmallerButtonScale, onBiggerButtonScale, biggerButtonScaleElement, smallerButtonScaleElement } from './photo-editing/scale-image.js';
import { resetSliderEffect, initEffectImage } from './photo-editing/effect-image.js';
import { initDownloadPicture } from './download-picture.js';

const uploadInputElement = document.querySelector('.img-upload__input');
const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const uploadCancelButtonElement = uploadOverlayElement.querySelector('.img-upload__cancel');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');

// Текст для кнопки отправки
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправление...'
};

// Изменение текста кнопки отправки.
const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.IDLE;
};

// Выходит ли сообщение об ошибке.
const isErrorMessageOpen = () => {
  const error = document.querySelector('.error');
  return Boolean(error);
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isFieldsInFocus() && !isErrorMessageOpen()) {
    evt.preventDefault();
    closeUploadForm();
  }
};

// Закрытие модального окна с фото.
function closeUploadForm () {
  uploadFormElement.reset();
  pristine.reset();
  resetScale();
  resetSliderEffect();
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
}

const onImgUploadCancelButton = () => {
  uploadCancelButtonElement.addEventListener('click', () => {
    closeUploadForm();
  });
};

// Открытие модального окна с фото.
const openUploadForm = () => {
  uploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  onImgUploadCancelButton();
  initEffectImage();
  smallerButtonScaleElement.addEventListener('click', onSmallerButtonScale);
  biggerButtonScaleElement.addEventListener('click', onBiggerButtonScale);
  document.addEventListener('keydown', onEscKeydown);
};


const openUploadModal = () => {
  uploadInputElement.addEventListener('input', () => {
    initDownloadPicture();
    openUploadForm();
  });
};

const onSubmitForm = (callback) => {
  uploadFormElement.addEventListener('submit', async (evt) =>{
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      await callback(new FormData(uploadFormElement));
      unblockSubmitButton();
    }
  });
};

export { openUploadModal, onSubmitForm, closeUploadForm, uploadInputElement };
