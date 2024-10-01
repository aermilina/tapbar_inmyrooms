import { useEffect, useState } from 'react';

export const useLocal = (key: string) => {
  const [localCount, setLocalCount] = useState<number>();
  useEffect(() => {
    const temp = window.localStorage.getItem(key);
    if (temp) {
      setLocalCount(parseInt(temp));
    }
  }, [localCount]);

  return localCount;
};
