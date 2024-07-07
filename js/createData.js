import { PHOTO_AMOUNT, LIKES_AMOUNT, AVATAR_ADDRESS_NUMBERS, COMMENTS_ID_AMOUNT, COMMENTS_AMOUNT } from './variables.js';
import { DESCRIPTION, NAME, COMMENTS } from './mocks.js';
import { getRandomIntegerInInterval, getUniqRandomIntegerGenerator, getRandomArrayElement } from './utils.js';

// Находим уникальное рандомное число для ID поста, в заданном промежутке.
const getUniqRandomIntegerId = getUniqRandomIntegerGenerator(1, PHOTO_AMOUNT);

// Находим уникальное рандомное число для ID комментария, в заданном промежутке.
const getUniqRandomCommentId = getUniqRandomIntegerGenerator(COMMENTS_ID_AMOUNT.min, COMMENTS_ID_AMOUNT.max);

// Находим неповторяющееся число в заданном промежутке для адреса фото.
const getUniqRandomInteger = getUniqRandomIntegerGenerator(1, PHOTO_AMOUNT);

// Создаем инфо о комментарии.
const createComment = () => ({
  id:  getUniqRandomCommentId(),
  avatar: `img/avatar-${ getRandomIntegerInInterval(AVATAR_ADDRESS_NUMBERS.min, AVATAR_ADDRESS_NUMBERS.max) }.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAME),
});

// Генерируем данные поста.
const dataPostGeneration = () => ({
  id: getUniqRandomIntegerId(),
  url: `photos/${ getUniqRandomInteger() }.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomIntegerInInterval(LIKES_AMOUNT.minLikes, LIKES_AMOUNT.maxLikes),
  comments: Array.from({length: getRandomIntegerInInterval(COMMENTS_AMOUNT.min, COMMENTS_AMOUNT.max)}, createComment),
});

const generatePostList = () => Array.from({length: PHOTO_AMOUNT}, dataPostGeneration);

export {generatePostList};
