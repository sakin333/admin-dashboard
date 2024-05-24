export const snackbar = (api, message, icon, description = "") => {
  api.open({
    message: message,
    description: description,
    icon: icon,
  });
};
