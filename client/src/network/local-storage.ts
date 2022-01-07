export const setItem = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value));

export const getItem = (key: string) =>
  JSON.parse(localStorage.getItem(key) || '');

export const multiRemove = (keys: string[]) => {
  keys.forEach(key => localStorage.removeItem(JSON.stringify(key)));
};
