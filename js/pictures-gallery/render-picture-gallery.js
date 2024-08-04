import { renderPicturesPreviews } from './create-preview';
import { openPictureModal } from './full-size-pictures-modal';
import { showAlert } from '../utils/messages/alert';
import { getData } from '../api';

const pictures = document.querySelector('.pictures');

// Находим картинку по ID.
const onPictureClick = (e, previews) => {
  const previewPicture = e.target.closest('[data-id]');
  if (!previewPicture) {
    return;
  }
  e.preventDefault();
  const picture = previews.find((item) => item.id === +previewPicture.dataset.id);
  openPictureModal(picture);
};

// Создаем галлерею миниатюр.
const createPicturesGallery = (previews) => {
  pictures.addEventListener('click', (e) => onPictureClick(e, previews));
  renderPicturesPreviews(previews, pictures);
};

const initPicturesGallery = async () => {
  try {
    const data = await getData();
    createPicturesGallery(data);
  } catch {
    showAlert();
  }
};

export { initPicturesGallery };
