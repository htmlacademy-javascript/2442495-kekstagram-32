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

export { getRandomIntegerInInterval, getUniqRandomIntegerGenerator, getRandomArrayElement };
