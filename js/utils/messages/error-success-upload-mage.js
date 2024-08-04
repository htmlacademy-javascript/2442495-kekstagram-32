import { isEscapeKey } from '../escape-key';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const onDocumentKeydown = (e) => {
  if (isEscapeKey(e)) {
    e.preventDefault();
    closeMessage();
  }
};

// Функция для обработки кликов по области.
const onBodyClick = (evt) => {
  if (!(evt.target.closest('.success__inner') || evt.target.closest('.error__inner'))) {
    closeMessage();
  }
};

// Функция закрытия сообщения.
function closeMessage () {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  if (messageElement) {
    messageElement.remove();
  }
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onBodyClick);
}

// Функция открытия сообщения.
const showMessage = (template) => {
  const messageElement = template.cloneNode(true);
  document.body.append(messageElement);

  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onBodyClick);
  messageElement.querySelector('.success__button, .error__button').addEventListener('click', closeMessage);
};

const showSuccessMessage = () => showMessage(successMessageTemplate);
const showErrorMessage = () => showMessage(errorMessageTemplate);

export { showErrorMessage, showSuccessMessage };
