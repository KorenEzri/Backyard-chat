import { useEffect, useRef, useState } from 'react';

export const useDebounce = <T, J>(
  value: T,
  initialState: J,
  cb: (value: T) => Promise<J> | J,
  delay: number,
  validator?: (arg0: T) => boolean,
) => {
  const [debouncedValue, setDebouncedValue] = useState<J>(initialState);
  const [argValue, setArgValue] = useState<T>(value);
  const [loading, setLoading] = useState<boolean>(false);

  const prevArgValue = useRef(value);

  useEffect(() => {
    if (validator) {
      if (!validator(value)) {
        prevArgValue.current = argValue;

        return setDebouncedValue(initialState);
      }
    }

    setLoading(true);

    const handler = setTimeout(async () => {
      prevArgValue.current = argValue;

      setDebouncedValue(await cb(argValue));

      setLoading(false);
    }, delay);

    return () => {
      clearTimeout(handler);

      if (validator) {
        if (!validator(value)) {
          return setLoading(false);
        } else setLoading(false);
      } else {
        setLoading(true);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, argValue, delay]);

  return { debouncedValue, loading, setArgValue };
};
