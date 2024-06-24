// Функция проверки длины строки

function checkStringLength (string, Maxlength) {
  return string.length <= Maxlength;
}

checkStringLength('Привет', 1);
checkStringLength('Привет', 11);

// Функция проверки на палиндром через цикл.

function isPalindrom2 (string) {
  const usualString = string.toUpperCase(''). replaceAll(' ', '');
  let newString = '';

  for (let i = usualString.length - 1; i >= 0; i--) {
    newString += usualString[i];
  }

  return newString === usualString;

}

isPalindrom2('топот');
isPalindrom2('ghbdtn');
isPalindrom2('ДовОд');
isPalindrom2('Лёша на полке клопа нашёл');


// Функция проверки на палиндром.

function isPalindrom (string) {
  // Приводим строку к верхнему регистру, убираем пробел, сравниваем строку, которая разбита на массив, отзеркалена и собрана обратно с изначальной строкой.
  //replace(/\s+/g, '') - убрать пробелы вариант 2?

  string = string.toUpperCase(''). replaceAll(' ', '');


  return string === string.split(''). reverse(''). join('');
}

isPalindrom('топот');
isPalindrom('ghbdtn');
isPalindrom('ДовОд');
isPalindrom('Лёша на полке клопа нашёл');
