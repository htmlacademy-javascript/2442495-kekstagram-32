import { renderPicturesPreviews } from './create-preview';
import { openPictureModal } from './full-size-pictures-modal';
import { showAlert } from '../utils/messages/alert';
import { getData } from '../api';
import { initFilterSorting, getFilteredGallery } from './gallery-filter';
import { debounce } from '../utils/debounce';

const pictures = document.querySelector('.pictures');

// Массив для хранения картинок.
let picturesList = [];

// Находим картинку по ID.
const onPictureClick = (evt) => {
  const previewPicture = evt.target.closest('[data-id]');

  if (!previewPicture) {
    return;
  }

  evt.preventDefault();

  const picture = picturesList.find((item) => item.id === +previewPicture.dataset.id);
  openPictureModal(picture);
};

// Создаем галлерею миниатюр.
const createPicturesGallery = (currentPreviews) => {
  picturesList = currentPreviews;
  renderPicturesPreviews(picturesList, pictures);
  pictures.addEventListener('click', onPictureClick);
};

// Инициализация галлереи картинок с сервера.
const initPicturesGallery = async () => {
  try {
    const data = await getData();
    const debouncedRenderGallery = debounce(createPicturesGallery);
    initFilterSorting(data, debouncedRenderGallery);
    createPicturesGallery(getFilteredGallery());
  } catch {
    showAlert();
  }
};

export { initPicturesGallery };
