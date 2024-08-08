import { uploadInputElement } from './photo-upload-modal';
import { imageElement } from './photo-editing/scale-image';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const previewEffectsElement = document.querySelectorAll('.effects__preview');

const initDownloadPicture = () => {
  const file = uploadInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imageElement.src = URL.createObjectURL(file);
    previewEffectsElement.forEach((preview) => {
      preview.style.backgroundImage = `url('${imageElement.src}')`;
    });
  }
};

export { initDownloadPicture };
