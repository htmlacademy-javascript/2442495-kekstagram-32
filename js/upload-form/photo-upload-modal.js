import { isEscapeKey } from '../utils/escape-key.js';
import { isFieldsInFocus, uploadForm, pristine } from './pristine-validation.js';
import { resetScale, onSmallerButtonScale, onBiggerButtonScale, biggerButtonScale, smallerButtonScale } from './photo-editing/scale-image.js';
import { resetSliderEffect, initEffectImage } from './photo-editing/effect-image.js';

const uploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancelButton = imgUploadOverlay.querySelector('.img-upload__cancel');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const error = document.querySelector('.error');

// Текст для кнопки отправки
const submitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Отправление...'
};

// Изменение текста кнопки отправки.
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = submitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = submitButtonText.IDLE;
};

// Выходит ли сообщение об ошибке.
const isErrorMessageOpen = () => Boolean(error);

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isFieldsInFocus() && !isErrorMessageOpen()) {
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
  initEffectImage();
  smallerButtonScale.addEventListener('click', onSmallerButtonScale);
  biggerButtonScale.addEventListener('click', onBiggerButtonScale);
  document.addEventListener('keydown', onEscKeydown);
};


const openUploadModal = () => {
  uploadInput.addEventListener('input', () => {
    openUploadForm();
  });
};

const onSubmitForm = (callback) => {
  uploadForm.addEventListener('submit', async (evt) =>{
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      await callback(new FormData(uploadForm));
      unblockSubmitButton();
    }
  });
};

export { openUploadModal, onSubmitForm, closeUploadForm };
