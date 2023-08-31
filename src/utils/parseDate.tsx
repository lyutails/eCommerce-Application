export const parseDateToWeb = (birthdayDefault: string): string => {
  const parts = birthdayDefault.split('-');
  const birthdayDate = parts[2] + '.' + parts[1] + '.' + parts[0];
  return birthdayDate;
};

export const parseDateToServer = (birthdayDefault: string): string => {
  const parts = birthdayDefault.split('.');
  const birthdayDate = parts[2] + '-' + parts[1] + '-' + parts[0];
  return birthdayDate;
};
