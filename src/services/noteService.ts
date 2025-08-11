import axios from "axios";
import { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

interface FetchNotesResponse {
  results: Note[];
  total_pages: number;
  total_results: number;
  page: number;
}



export const fetchNotes = async (
  query: string,
  page = 1
): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`, {
    params: {
      query,
      page,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};




interface CreateNotesResponse {
  results: Note[];
  total_pages: number;
  total_results: number;
  page: number;
}


export const createNote = async (
  query: string,
  page = 1
): Promise<CreateNotesResponse> => {
  const response = await axios.post<CreateNotesResponse>(`${BASE_URL}/notes`, {
    params: {
      query,
      page,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};


interface DeleteNotesResponse {
  results: Note[];
  total_pages: number;
  total_results: number;
  page: number;
}

export const deleteNote = async (
  query: string,
  page = 1
): Promise<DeleteNotesResponse> => {
  const response = await axios.delete<DeleteNotesResponse>(`${BASE_URL}/notes/{id}`, {
    params: {
      query,
      page,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};
