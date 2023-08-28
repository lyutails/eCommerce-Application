export function getMinUserAge(): Date {
  const minAge = '13';
  const currentDate = new Date();
  const year = currentDate.getFullYear() - parseInt(minAge);
  const month = currentDate.getMonth();
  const day = currentDate.getDate();
  return new Date(year, month, day);
}
