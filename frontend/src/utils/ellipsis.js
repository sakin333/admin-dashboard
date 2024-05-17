export const ellipsis = (value, maxLength = 50) => {
  if (value.length <= maxLength) {
    return value;
  }
  return value.substring(0, maxLength) + "...";
};
