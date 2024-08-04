const VALID_HASHTAG = /^#[A-ZА-ЯЁa-zа-яё0-9]{1,19}$/;
const MAX_HASHTAGS = 5;
const MAX_COMMENTS_LENGTH = 140;

const uploadForm = document.querySelector('.img-upload__form');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const commentsField = uploadForm.querySelector('.text__description');

const errorMessage = {
  INVALID_COUNT: `Максимальное количество хэштегов ${MAX_HASHTAGS}.`,
  REPEAT_HASHTAGS: 'Хэштеги не должны повторятся.',
  INVALID__HASHTAG: 'Введен невалидный хэштег.',
  INVALID_COMMENTS_LENGTH: `Длина комментария не может составлять больше  ${MAX_COMMENTS_LENGTH} символов.`
};

const pristine = new Pristine(uploadForm, {
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
const isFieldsInFocus = () => hashtagsField === document.activeElement || commentsField === document.activeElement;


pristine.addValidator(
  hashtagsField,
  checkValidHastags,
  errorMessage.INVALID__HASHTAG
);

pristine.addValidator(
  hashtagsField,
  checkHashtagsAmount,
  errorMessage.INVALID_COUNT
);

pristine.addValidator(
  hashtagsField,
  checkUniqHashtags,
  errorMessage.REPEAT_HASHTAGS
);

pristine.addValidator(
  commentsField,
  checkCommentsLength,
  errorMessage. INVALID_COMMENTS_LENGTH
);


export { isFieldsInFocus, uploadForm, pristine };
