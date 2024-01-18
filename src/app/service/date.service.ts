export const colDate = () => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const dateFormat = new Intl.DateTimeFormat("es-CO", options).format(date);

  return dateFormat;
};