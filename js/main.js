import { initPicturesGallery } from './pictures-gallery/render-picture-gallery.js';
import { openUploadModal, closeUploadForm, onSubmitForm } from './upload-form/photo-upload-modal.js';
import { sendData } from './api.js';
import { showErrorMessage, showSuccessMessage } from './utils/messages/error-success-upload-mage.js';

// Отображение галлереии изображений с сервера.
initPicturesGallery();

// Открытие модального окна после загрузки фото.
openUploadModal();


onSubmitForm(async (data) => {
  try {
    await sendData(data);
    closeUploadForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});
