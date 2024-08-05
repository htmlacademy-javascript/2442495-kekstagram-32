import { uploadElement, imageElement } from './scale-image';


const effectsContainer = uploadElement.querySelector('.effects');
const effectSlider = uploadElement.querySelector('.effect-level__slider');
const effectWrapper = uploadElement.querySelector('.img-upload__effect-level');
const effectLevelValue = uploadElement.querySelector('.effect-level__value');

// Эффекты фото.
const PhotoEffect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

// Настройка эффектов.
const filterEffects = {
  [PhotoEffect.CHROME]: {
    style:'grayscale',
    unit: '',
  },
  [PhotoEffect.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [PhotoEffect.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [PhotoEffect.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [PhotoEffect.HEAT]: {
    style: 'brightness',
    unit: '',
  }
};

// Настройка слайдера.
const settingEffectsForSlider = {
  [PhotoEffect.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [PhotoEffect.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [PhotoEffect.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  [PhotoEffect.MARVIN]: {
    min: 0,
    max: 100,
    step: 1,
  },
  [PhotoEffect.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  [PhotoEffect.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

// Выбранный эффект.
let selectedEffect = PhotoEffect.DEFAULT;

// Проверка эффекта по умолчанию.
const isDefaultEffect = () => selectedEffect === PhotoEffect.DEFAULT;

const applyImageEffect = () => {
  imageElement.style.filter = isDefaultEffect()
    ? 'none'
    : `${filterEffects[selectedEffect].style}(${effectLevelValue.value}${filterEffects[selectedEffect].unit})`;
};

// Изменение видимости слайдера.
const toggleSliderVisibility = (isVisible) => {
  effectWrapper.classList.toggle('hidden', !isVisible);
};

// Обновление эффекта слайдера.
const onSliderUpdateEffect = () => {
  effectLevelValue.value = effectSlider.noUiSlider.get();
  applyImageEffect();
};

// Создание слайдера.
const createSliderEffect = ({ min, max, step }) => {
  noUiSlider.create(effectSlider, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    },
  });
  effectSlider.noUiSlider.on('update', onSliderUpdateEffect);
  toggleSliderVisibility(false);
};

// Обновление и настройка слайдера.
const updateSliderEffect = ({ min, max, step }) => {
  effectSlider.noUiSlider.updateOptions({
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
  if (effectSlider.noUiSlider) {

    // Удаляем слайдер.
    effectSlider.noUiSlider.destroy();
  }
  setSelectedEffect(PhotoEffect.DEFAULT);
};

// Обработчик события изменения эффекта.
const onSliderChange = (evt) => {
  setSelectedEffect(evt.target.value);
};

// Инициализация настроек слайдера и добавление обработчик событий.
const initEffectImage = () => {
  createSliderEffect(settingEffectsForSlider[selectedEffect]);
  effectsContainer.addEventListener('change', onSliderChange);
};

export { resetSliderEffect, initEffectImage };
