import * as React from 'react';

export function useLocalStorageState<T>(
  key: string,
  defaultValue: T | (() => T),
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = React.useState(defaultValue);

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    setState((prev) => {
      const valueInLocalStorage = window.localStorage.getItem(key);
      if (valueInLocalStorage) {
        return deserialize(valueInLocalStorage);
      }
      // @ts-ignore
      return prev;
    });
  }, [deserialize, key]);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    // need to set the current value before setting the new value
    setTimeout(() => {
      window.localStorage.setItem(key, serialize(state));
    }, 100);
  }, [key, state, serialize]);

  return [state, setState];
}
