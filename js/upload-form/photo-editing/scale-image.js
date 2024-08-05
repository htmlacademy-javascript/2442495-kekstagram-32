const MIN_SCALE = 25;
const MAX_SCALE = 100;
const SCALE_STEP = 25;
const DEFAULT_SCALE = 100;

const uploadElement = document.querySelector('.img-upload');
const smallerButtonScale = uploadElement.querySelector('.scale__control--smaller');
const biggerButtonScale = uploadElement.querySelector('.scale__control--bigger');
const scaleInput = uploadElement.querySelector('.scale__control--value');
const imageElement = uploadElement.querySelector('.img-upload__preview img');

// Изменение масштаба и обновление значения
const updateImageScale = (newValue) => {
  const scaleValue = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newValue));
  imageElement.style.transform = `scale(${scaleValue / 100})`;
  scaleInput.setAttribute('value', `${scaleValue}%`);
};

const onBiggerButtonScale = () => updateImageScale(parseInt(scaleInput.value, 10) + SCALE_STEP);
const onSmallerButtonScale = () => updateImageScale(parseInt(scaleInput.value, 10) - SCALE_STEP);

// Сброс масштаба к значению по умолчанию
const resetScale = () => updateImageScale(DEFAULT_SCALE);

export { resetScale, onSmallerButtonScale, onBiggerButtonScale, smallerButtonScale, biggerButtonScale, uploadElement, imageElement };
