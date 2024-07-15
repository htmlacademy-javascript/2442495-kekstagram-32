import { generatePostList } from './createData';

const picturePreviewTemplate = document.querySelector('#picture').content.querySelector('.picture');
const createSimilarPicturesData = generatePostList();
const picturesContainer = document.createDocumentFragment();

const createUsersCards = (root) => {
  createSimilarPicturesData.forEach(({ url, description, likes, comments }) => {
    const pictureElement = picturePreviewTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    picturesContainer.appendChild(pictureElement);
  });

  root.appendChild(picturesContainer);
};

export { createUsersCards };
