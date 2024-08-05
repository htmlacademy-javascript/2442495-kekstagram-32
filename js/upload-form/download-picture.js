import { uploadInput } from './photo-upload-modal';
import { imageElement } from './photo-editing/scale-image';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const previewEffects = document.querySelectorAll('.effects__preview');

const initDownloadPicture = () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imageElement.src = URL.createObjectURL(file);
    previewEffects.forEach((preview) => {
      preview.style.backgroundImage = `url('${imageElement.src}')`;
    });
  }
};

export { initDownloadPicture };
