import { useState, useEffect, useRef } from "react";
import styles from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  initialQuery?: string; // Додано новий пропс
}

export default function SearchBox({
  onSearch,
  initialQuery = "",
}: SearchBoxProps) {
  const [query, setQuery] = useState(initialQuery); // Використовуємо initialQuery
  const timerRef = useRef<number | null>(null);

  // Синхронізуємо зовнішній стан при зміні initialQuery
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      onSearch(query);
    }, 600);

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [query, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
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
