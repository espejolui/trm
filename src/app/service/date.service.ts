export const DateService = () => {
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' } as Intl.DateTimeFormatOptions;
  const currentDate = new Date().toLocaleDateString('es-CO', { ...options, timeZone: 'America/Bogota' });

  return currentDate;
};
