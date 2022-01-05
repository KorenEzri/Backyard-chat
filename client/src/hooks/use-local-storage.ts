import * as React from 'react';
import { Maybe } from 'types';

function getStorageValue(key: string, defaultValue: any) {
  const saved: Maybe<string> = localStorage.getItem(key);

  if (saved) {
    const initial = JSON.parse(saved);
    return initial || defaultValue;
  }

  return null;
}

export const useLocalStorage = (key: string, defaultValue: any) => {
  const [value, setValue] = React.useState(() => {
    return getStorageValue(key, defaultValue);
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
