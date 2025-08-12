import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import styles from './SearchBox.module.css';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search notes"
        value={query}
        onChange={handleChange}
      />
      {query && (
        <button className={styles.clearButton} onClick={handleClear}>
          ×
        </button>
      )}
    </div>
  );
}