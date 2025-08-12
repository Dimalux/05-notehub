import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Toaster, toast } from 'react-hot-toast';
import { fetchNotes, createNote, deleteNote } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import styles from './App.module.css';
import { Note } from '../../types/note';

export default function App() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, searchQuery],
    queryFn: () => fetchNotes(page, 12, searchQuery),
    retry: 2,
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note created successfully!');
      setIsModalOpen(false);
    },
    onError: () => {
      toast.error('Failed to create note');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete note');
    },
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  const handleCreateNote = (values: Omit<Note, 'id'>) => {
    createMutation.mutate(values);
  };

  const handleDeleteNote = (id: number) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (isError) {
    return <div className={styles.error}>Error loading notes</div>;
  }

  return (
    <div className={styles.app}>
      <Toaster position="top-center" />
      <header className={styles.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {data && data.total_pages > 1 && (
          <Pagination
            pageCount={data.total_pages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}
        <button
          className={styles.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>

      <main>
        {data?.results?.length ? (
          <NoteList notes={data.results} onDelete={handleDeleteNote} />
        ) : (
          <div className={styles.empty}>No notes found</div>
        )}
      </main>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSubmit={handleCreateNote}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}