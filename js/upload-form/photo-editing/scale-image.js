const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;
const DEFAULT_SCALE = 100;

const uploadElement = document.querySelector('.img-upload');
const smallerButtonScaleElement = uploadElement.querySelector('.scale__control--smaller');
const biggerButtonScaleElement = uploadElement.querySelector('.scale__control--bigger');
const scaleInputElement = uploadElement.querySelector('.scale__control--value');
const imageElement = uploadElement.querySelector('.img-upload__preview img');

// Изменение масштаба и обновление значения
const updateImageScale = (newValue) => {
  const scaleValue = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newValue));
  imageElement.style.transform = `scale(${scaleValue / 100})`;
  scaleInputElement.setAttribute('value', `${scaleValue}%`);
};

const onBiggerButtonScale = () => updateImageScale(parseInt(scaleInputElement.value, 10) + SCALE_STEP);
const onSmallerButtonScale = () => updateImageScale(parseInt(scaleInputElement.value, 10) - SCALE_STEP);

// Сброс масштаба к значению по умолчанию
const resetScale = () => updateImageScale(DEFAULT_SCALE);

export { resetScale, onSmallerButtonScale, onBiggerButtonScale, smallerButtonScaleElement, biggerButtonScaleElement, uploadElement, imageElement };
