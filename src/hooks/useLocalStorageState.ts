import * as React from 'react';

export function useLocalStorageState<T>(
  key: string,
  defaultValue: T,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = React.useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? (deserialize(item) as T) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  });

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    // need to set the current value before setting the new value
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState];
}
