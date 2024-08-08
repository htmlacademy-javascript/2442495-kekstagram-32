import { uploadElement, imageElement } from './scale-image';


const effectsContainerElement = uploadElement.querySelector('.effects');
const effectSliderElement = uploadElement.querySelector('.effect-level__slider');
const effectWrapperElement = uploadElement.querySelector('.img-upload__effect-level');
const effectLevelValueElement = uploadElement.querySelector('.effect-level__value');

// Эффекты фото.
const PhotoEffects = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

// Настройка эффектов.
const FilterEffects = {
  [PhotoEffects.CHROME]: {
    style:'grayscale',
    unit: '',
  },
  [PhotoEffects.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [PhotoEffects.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [PhotoEffects.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [PhotoEffects.HEAT]: {
    style: 'brightness',
    unit: '',
  }
};

// Настройка слайдера.
const settingEffectsForSlider = {
  [PhotoEffects.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [PhotoEffects.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [PhotoEffects.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [PhotoEffects.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [PhotoEffects.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [PhotoEffects.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

// Выбранный эффект.
let selectedEffect = PhotoEffects.DEFAULT;

// Проверка эффекта по умолчанию.
const isDefaultEffect = () => selectedEffect === PhotoEffects.DEFAULT;

const applyImageEffect = () => {
  imageElement.style.filter = isDefaultEffect()
    ? 'none'
    : `${FilterEffects[selectedEffect].style}(${effectLevelValueElement.value}${FilterEffects[selectedEffect].unit})`;
};

// Изменение видимости слайдера.
const toggleSliderVisibility = (isVisible) => {
  effectWrapperElement.classList.toggle('hidden', !isVisible);
};

// Обновление эффекта слайдера.
const onSliderUpdateEffect = () => {
  effectLevelValueElement.value = effectSliderElement.noUiSlider.get();
  applyImageEffect();
};

// Создание слайдера.
const createSliderEffect = ({ min, max, step }) => {
  noUiSlider.create(effectSliderElement, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    },
  });
  effectSliderElement.noUiSlider.on('update', onSliderUpdateEffect);
  toggleSliderVisibility(false);
};

// Обновление и настройка слайдера.
const updateSliderEffect = ({ min, max, step }) => {
  effectSliderElement.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max,
  });
};

// Настройка видимости слайдера в зависимости от выбранного эффекта.
const setSliderEffect = () => {
  if (isDefaultEffect()) {
    toggleSliderVisibility(false);
  } else {
    updateSliderEffect(settingEffectsForSlider[selectedEffect]);
    toggleSliderVisibility(true);
  }
};

// Установка выбранного эффекта
const setSelectedEffect = (effect) => {
  selectedEffect = effect;
  setSliderEffect();
  applyImageEffect();
};

// Сброс эффектов к значениям по умолчанию.
const resetSliderEffect = () => {
  if (effectSliderElement.noUiSlider) {

    // Удаляем слайдер.
    effectSliderElement.noUiSlider.destroy();
  }
  setSelectedEffect(PhotoEffects.DEFAULT);
};

// Обработчик события изменения эффекта.
const onSliderChange = (evt) => {
  setSelectedEffect(evt.target.value);
};

// Инициализация настроек слайдера и добавление обработчик событий.
const initEffectImage = () => {
  createSliderEffect(settingEffectsForSlider[selectedEffect]);
  effectsContainerElement.addEventListener('change', onSliderChange);
};

export { resetSliderEffect, initEffectImage };
