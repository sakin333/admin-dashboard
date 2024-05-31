import dayjs from "dayjs";

export const getDateColor = (dateArg) => {
  const date = dayjs(dateArg);
  const today = dayjs();

  if (date.isBefore(today)) {
    return "error";
  }

  if (date.isBefore(today.add(3, "day"))) {
    return "warning";
  }

  return "default";
};
