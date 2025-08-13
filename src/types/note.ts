export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt?: string; 
  updatedAt?: string; 
}

export interface NotesResponse {
  notes: Note[];
 
totalPages: number;  // Тепер відповідає API

  total_results: number;
  page: number;
}