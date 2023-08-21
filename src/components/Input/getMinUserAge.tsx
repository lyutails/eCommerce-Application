export function getMinUserAge(): Date {
  const currentDate = new Date();
  const year =
    currentDate.getFullYear() - parseInt(process.env.MIN_USER_AGE ?? '13');
  const month = currentDate.getMonth();
  const day = currentDate.getDate();
  return new Date(year, month, day);
}
