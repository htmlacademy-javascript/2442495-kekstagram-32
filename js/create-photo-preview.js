import { generatePostList } from './create-data';
import { openPictureModal } from './full-size-pictures-modal';

const pictures = document.querySelector('.pictures');
const picturePreviewTemplate = document.querySelector('#picture').content.querySelector('.picture');
const createSimilarPicturesData = generatePostList();


// Создаем миниатюры постов, добавляем обработчик по клику.

const onPicturesRegister = () => {
  pictures.addEventListener('click', (e) => {
    if (e.target.closest('.picture')){
      const correctId = e.target.closest('.picture').id;
      const correctPicture = createSimilarPicturesData.find(
        (item) => String(item.id) === String(correctId)
      );
      openPictureModal(correctPicture);
    }
  });
};

// Отображение миниатюр.

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
  onPicturesRegister();
};


export { createUsersCards };
