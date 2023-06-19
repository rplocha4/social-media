import React from 'react';

function useDebounce({ value, delay }: { value: string; delay: number }) {
  const [debauncedSearch, setDebauncedSearch] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebauncedSearch(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [debauncedSearch];
}

export default useDebounce;
