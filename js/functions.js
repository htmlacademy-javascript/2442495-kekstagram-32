// Функция проверки длины строки

function checkStringLength (string, Maxlength) {
  return string.length <= Maxlength;
}

checkStringLength('Привет', 1);
checkStringLength('Привет', 11);

// Функция проверки на палиндром через цикл.

function isPalindrom2 (string) {
  const usualString = string.toUpperCase('').replaceAll(' ', '');
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

  string = string.toUpperCase('').replaceAll(' ', '');


  return string === string.split('').reverse('').join('');
}

isPalindrom('топот');
isPalindrom('ghbdtn');
isPalindrom('ДовОд');
isPalindrom('Лёша на полке клопа нашёл');


/*
'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/

const checkMeetingTime = (startWorkDay, endWorkDay, startMeeting, durationMeeting) => {

  // Делаем из строки с временем массив, преобразуем в числа, делаем проверку на время.
  const timeToMinutes = (time) => {
    const timeArray = time.split(':');
    const hours = parseInt(timeArray[0], 10);
    const minutes = parseInt(timeArray[1], 10);
    return hours * 60 + minutes;
  };

  const startWork = timeToMinutes(startWorkDay);
  const endWork = timeToMinutes(endWorkDay);
  const startMeetingTime = timeToMinutes(startMeeting);


  const timeOfMeetingEnd = startMeetingTime + durationMeeting;


  return startMeetingTime >= startWork && timeOfMeetingEnd <= endWork;
};

checkMeetingTime('08:00', '17:30', '14:00', 90); // true
checkMeetingTime('8:0', '10:0', '8:0', 120); // true
checkMeetingTime('08:00', '14:30', '14:00', 90); // false
checkMeetingTime('14:00', '17:30', '08:0', 90); // false
checkMeetingTime('8:00', '17:30', '08:00', 900); // false

/*
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

function openPictureModal () {
  pictures.addEventListener('click', (e) => {
    if (e.target.closest('.picture')) {
      fullSizePicture.classList.remove('hidden');
      document.body.classList.add('modal-open');
    }
    document.addEventListener('keydown', onDocumentKeydown);
  });
}

function closePictureModal () {
  closeFullSizePicture.addEventListener('click', () => {
    fullSizePicture.classList.add('hidden');
  });
  document.removeEventListener('keydown', onDocumentKeydown);
}

closePictureModal();
openPictureModal();*/
