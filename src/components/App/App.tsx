import { useState, useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";
import { fetchNotes, createNote, deleteNote } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import styles from "./App.module.css";

export default function App() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["notes", page, searchQuery],
    queryFn: () => fetchNotes(page, 12, searchQuery),
    retry: 2,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isSuccess && data?.notes) {
      console.log("Data received:", data);
      if (data.notes.length === 0) {
        console.log("No notes found in response");
      }
    }
    if (isError) {
      console.error("Error fetching notes:", error);
    }
  }, [isSuccess, isError, data, error]);

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", page, searchQuery] });
      toast.success("Note created successfully!");
      setIsModalOpen(false);
    },
    onError: (err: Error) => {
      toast.error("Failed to create note");
      console.error("Create note error:", err);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id), // Явно вказуємо тип string для id
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", page, searchQuery] });
      toast.success("Note deleted successfully!");
    },
    onError: (err: Error) => {
      toast.error("Failed to delete note");
      console.error("Delete note error:", err);
    },
  });

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (isError) {
    return (
      <div className={styles.error}>
        Error loading notes
        {error && <p>{(error as Error).message}</p>}
      </div>
    );
  }

  const hasNotes = isSuccess && data?.notes?.length > 0;

  return (
    <div className={styles.app}>
      <Toaster position="top-center" />
      <header className={styles.toolbar}>
        <SearchBox
          onSearch={(query) => {
            setSearchQuery(query);
          }}
        />

        {hasNotes && data?.totalPages && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={(selectedPage) => setPage(selectedPage)}
          />
        )}
        <button className={styles.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      <main>
        {hasNotes ? (
          <NoteList
            notes={data?.notes || []}
            onDelete={(id: string) => deleteMutation.mutate(id)} // Тип string для id
          />
        ) : (
          <div className={styles.empty}>No notes found</div>
        )}
      </main>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSubmit={(values) => createMutation.mutate(values)}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
