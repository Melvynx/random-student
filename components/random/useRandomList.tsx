import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { parseUrlQuery } from '../utils';
import { appKey } from './Root';

export default function useRandomList(): [
  string[],
  Dispatch<SetStateAction<string[]>>
] {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    const keyParams = parseUrlQuery(window.location.href)[appKey];
    if (keyParams) {
      const array = keyParams.split(',');
      console.log('Array', array);
      setList(array);
      return;
    }
  }, [setList]);

  useEffect(() => {
    if (list.length === 0) return;
    const url = new URL(window.location.href);
    url.searchParams.set(
      appKey,
      Array.isArray(list) ? list.join(',') : String(list)
    );
    history.pushState({}, '', url);
  }, [list]);

  return [list, setList];
}
