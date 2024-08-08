const ALERT_SHOW_TIME = 5000;

const errorTemplateElement = document.querySelector('#data-error').content.querySelector('.data-error');

const showAlert = () => {
  const errorElement = errorTemplateElement.cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ALERT_SHOW_TIME);
};

export { showAlert };
