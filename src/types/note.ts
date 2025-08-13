// export interface Movie {
//   id: number;
//   title: string;
//   poster_path: string;
//   backdrop_path: string;
//   overview: string;
//   release_date: string;
//   vote_average: number;
// }

// export interface Note {
//   id: number;
//   title: string;
//   content: string;
//   createdAt: "2022-01-01T00:00:00Z";
//   updatedAt: "2022-01-01T00:00:00Z";
//   tag: "Todo";
// }

// export interface Note {
//   id: number;
//   title: string;
//   content: string;
//   //   created_at: string;
// }



// export interface Note {
//   id: number;
//   title: string;
//   content: string;
//   tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
// }




// export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

// export interface Note {
//   id: number;
//   title: string;
//   content: string;
//   tag: NoteTag;
// }


// export interface Note {
//   id: number;
//   title: string;
//   content: string;
//   // tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
// tag: string;

// }


export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt?: string; // Додано "?" (optional)
  updatedAt?: string; // Додано "?" (optional)
}

export interface NotesResponse {
  notes: Note[];
  // total_pages: number;

totalPages: number;  // Тепер відповідає API

  total_results: number;
  page: number;
}