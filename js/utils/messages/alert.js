const ALERT_SHOW_TIME = 5000;

const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showAlert = () => {
  const errorElement = errorTemplate.cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME);
};

export { showAlert };
