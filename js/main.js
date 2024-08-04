import { createUsersCards } from './create-photo-preview.js';
import { openUploadModal } from './upload-form/photo-upload-modal.js';

createUsersCards(document.querySelector('.pictures'));
openUploadModal();
