const PHOTO_AMOUNT = 25;
const LIKES_AMOUNT = {
  minLikes: 15,
  maxLikes: 200
};
const AVATAR_ADDRESS_NUMBERS = {
  min: 1,
  max: 6
};
const COMMENTS_ID_AMOUNT = {
  min: 0,
  max: 10000
};

const COMMENTS_AMOUNT = {
  min: 0,
  max: 30
};

const DESCRIPTION = [
  'Загадочный взгляд',
  'Улыбка, которая согревает сердце',
  'Момент счастья',
  'Нежность в каждом движении',
  'Радость встречи',
  'Волшебство момента',
  'Искренние эмоции',
  'Взгляд в будущее',
  'Минута покоя',
  'Счастье в мелочах',
  'Любовь в каждом кадре',
  'Неотразимая красота',
  'Вдохновение в каждом снимке',
  'Забота и теплота',
  'Путешествие в мир эмоций',
  'Магия момента',
  'Радость жизни',
  'Нежность и забота',
  'Любовь и гармония',
  'Забота и поддержка',
  'Счастье в каждом кадре',
  'Умиротворение и покой',
  'Любовь и дружба',
  'Нежность и искренность',
  'Волшебство моментальной съёмки'
];

const NAME = [
  'Иван',
  'Мария',
  'Александр',
  'Екатерина',
  'Дмитрий',
  'Анастасия',
  'Алексей',
  'Ольга',
  'Владимир',
  'Татьяна'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

// Функция нахождения случайного числа в заданном промежутке
function getRandomIntegerInInterval (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// Функция нахождения случайного, неповторяющегося числа в заданном промежутке
function getUniqRandomIntegerGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomIntegerInInterval(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomIntegerInInterval(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

// Находим случайный индекс в массиве.
const getRandomArrayElement = (elements) => elements[getRandomIntegerInInterval(0, elements.length - 1)];

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
const dataGeneration = () => ({
  id: getUniqRandomIntegerId(),
  url: `photos/${ getUniqRandomInteger() }.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomIntegerInInterval(LIKES_AMOUNT.minLikes, LIKES_AMOUNT.maxLikes),
  comments: Array.from({length: getRandomIntegerInInterval(COMMENTS_AMOUNT.min, COMMENTS_AMOUNT.max)}, createComment),
});

const generatePostList = Array.from({length: PHOTO_AMOUNT}, dataGeneration);

console.log(generatePostList);
