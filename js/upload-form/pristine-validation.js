const VALID_HASHTAG = /^#[A-ZА-ЯЁa-zа-яё0-9]{1,19}$/;
const MAX_HASHTAGS = 5;
const MAX_COMMENTS_LENGTH = 140;

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagsFieldElement = uploadFormElement.querySelector('.text__hashtags');
const commentsFieldElement = uploadFormElement.querySelector('.text__description');

const ErrorMessages = {
  INVALID_COUNT: `Максимальное количество хэштегов ${MAX_HASHTAGS}.`,
  REPEAT_HASHTAGS: 'Хэштеги не должны повторятся.',
  INVALID__HASHTAG: 'Введен невалидный хэштег.',
  INVALID_COMMENTS_LENGTH: `Длина комментария не может составлять больше  ${MAX_COMMENTS_LENGTH} символов.`
};

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

// Преобразование строки.
const normalizeString = (value) => {
  const hashtags = value.toLowerCase().trim().split(' ').filter((hashtagsString) => Boolean(hashtagsString.length));
  return hashtags;
};

// Проверка валидности хэштега.
const checkValidHastags = (value) => normalizeString(value).every((tag) => VALID_HASHTAG.test(tag));

// Проверка количества хэштегов.
const checkHashtagsAmount = (value) => normalizeString(value).length <= MAX_HASHTAGS;

// Проверка уникальности хэштегов.
const checkUniqHashtags = (value) => {
  const hashtagsString = normalizeString(value);
  return hashtagsString.length === new Set(hashtagsString).size;
};

// Проверка длины хэштегов.
const checkCommentsLength = (value) => value.length <= MAX_COMMENTS_LENGTH;

// Проверка находятся ли в фокусе поля - комментарии и хэштеги.
const isFieldsInFocus = () => hashtagsFieldElement === document.activeElement || commentsField === document.activeElement;


pristine.addValidator(
  hashtagsFieldElement,
  checkValidHastags,
  ErrorMessages.INVALID__HASHTAG
);

pristine.addValidator(
  hashtagsFieldElement,
  checkHashtagsAmount,
  ErrorMessages.INVALID_COUNT
);

pristine.addValidator(
  hashtagsFieldElement,
  checkUniqHashtags,
  ErrorMessages.REPEAT_HASHTAGS
);

pristine.addValidator(
  commentsFieldElement,
  checkCommentsLength,
  ErrorMessages. INVALID_COMMENTS_LENGTH
);


export { isFieldsInFocus, uploadFormElement, pristine };
