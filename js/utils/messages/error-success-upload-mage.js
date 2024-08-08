import { isEscapeKey } from '../escape-key';

const successMessageTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplateElement = document.querySelector('#error').content.querySelector('.error');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
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

const showSuccessMessage = () => showMessage(successMessageTemplateElement);
const showErrorMessage = () => showMessage(errorMessageTemplateElement);

export { showErrorMessage, showSuccessMessage };
