import axios from 'axios';
import { Note } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';

interface NotesResponse {
  notes: Note[];
  total_pages: number;
  total_results: number;
  page: number;
}

export const fetchNotes = async (
  page = 1,
  perPage = 12,
  search = ''
): Promise<NotesResponse> => {
  try {
    const response = await axios.get<NotesResponse>(`${BASE_URL}/notes`, {
      params: { page, perPage, search },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    });
    console.log('API Response:', response.data); // Додано для налагодження
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

export const createNote = async (note: Omit<Note, 'id'>): Promise<Note> => {
  try {
    const response = await axios.post<Note>(`${BASE_URL}/notes`, note, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};


export const deleteNote = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    });
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};