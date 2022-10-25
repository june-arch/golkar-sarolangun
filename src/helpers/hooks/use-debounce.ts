import { useContext, useEffect, useState } from 'react';

import { TableContext } from './use-context';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const {pageState} = useContext(TableContext);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      pageState.setPage(1);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
