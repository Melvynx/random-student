import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { parseUrlQuery, randomListQueryKey } from '~/service';

export const useRandomList = (): [string[], Dispatch<SetStateAction<string[]>>] => {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    const keyParams = parseUrlQuery(window.location.href)[randomListQueryKey];
    if (keyParams) {
      const array = keyParams.split(',');
      setList(array);
      return;
    }
  }, [setList]);

  useEffect(() => {
    if (list.length === 0) return;
    const url = new URL(window.location.href);
    url.searchParams.set(
      randomListQueryKey,
      Array.isArray(list) ? list.join(',') : String(list)
    );
    history.pushState({}, '', url);
  }, [list]);

  return [list, setList];
};
