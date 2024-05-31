export const snackbar = (api, type, message, description = "") => {
  api[type]({
    message: message,
    description: description,
  });
};
