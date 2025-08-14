import { useState, useEffect } from "react";
import styles from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export default function SearchBox({
  onSearch,
  initialQuery = "",
}: SearchBoxProps) {
  const [query, setQuery] = useState(initialQuery);
  let timerId: number | null = null;

  // Синхронізуємо зовнішній стан при зміні initialQuery
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    // Очищаємо попередній таймер, якщо він існує
    if (timerId !== null) {
      clearTimeout(timerId);
    }

    // Встановлюємо новий таймер
    timerId = window.setTimeout(() => {
      onSearch(query);
    }, 600);

    // Функція очищення для видалення таймера
    return () => {
      if (timerId !== null) {
        clearTimeout(timerId);
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