//const pictures = document.querySelector('.pictures');
const picturePreviewTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Создание миниатюры.

const createPicturePreviews = ({ url, description, likes, comments, id}) => {
  const picturePreview = picturePreviewTemplate.cloneNode(true);

  picturePreview.querySelector('.picture__img').src = url;
  picturePreview.querySelector('.picture__img').alt = description;
  picturePreview.querySelector('.picture__likes').textContent = likes;
  picturePreview.querySelector('.picture__comments').textContent = comments.length;
  picturePreview.dataset.id = id;

  return picturePreview;
};

// Отображение миниатюры.
const renderPicturesPreviews = (previews, container) => {
  const picturesContainer = document.createDocumentFragment();
  previews.forEach((picture) => {
    const picturePreview = createPicturePreviews(picture);
    picturesContainer.append(picturePreview);
  });
  container.append(picturesContainer);
};

export { renderPicturesPreviews };
