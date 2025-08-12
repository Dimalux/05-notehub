import axios from 'axios';
import { Note } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';

interface FetchNotesResponse {
  results: Note[];
  total_pages: number;
  total_results: number;
  page: number;
}

export const fetchNotes = async (
  page = 1,
  perPage = 12,
  search = ''
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`, {
    params: { page, perPage, search },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

export const createNote = async (note: Omit<Note, 'id'>): Promise<Note> => {
  const response = await axios.post<Note>(`${BASE_URL}/notes`, note, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

export const deleteNote = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
};