export const setItem = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value));

export const getItem = (key: string) => {
  const value = localStorage.getItem(key);
  if (value && value !== 'undefined') {
    return JSON.parse(value || '');
  } else {
    localStorage.removeItem(key);
  }
};

export const multiRemove = (keys: string[]) => {
  keys.forEach(key => localStorage.removeItem(JSON.stringify(key)));
};
