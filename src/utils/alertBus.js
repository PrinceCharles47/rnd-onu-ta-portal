let showAlert = null;

export const alertBus = {
  register(func) {
    showAlert = func;
  },

  showAlert(alert, options) {
    if (showAlert) {
      showAlert(alert, options);
    } else {
      console.error("AlertBus: showAlert not yet registered ", message);
    }
  },
};
