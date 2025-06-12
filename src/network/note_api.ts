import { Notes } from "../types/notes";

interface createNoteData {
  title: string;
  text: string;
}

interface createNoteAPIResponseBody {
  message: string;
  data: Notes;
}

export async function createNote(data: createNoteData): Promise<{
  status: number;
  message: string;
  data: Notes;
}> {
  const response = await fetch("http://localhost:9000/create/note", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const responseJson: createNoteAPIResponseBody = await response.json();
  return {
    status: response.status,
    message: responseJson.message,
    data: responseJson.data,
  };
}

interface updateNoteData {
  noteId: string;
  title: string;
  text: string;
}

export async function updateNote(data: updateNoteData): Promise<{
  status: number;
  message: string;
  data: Notes;
}> {
  const response = await fetch("http://localhost:9000/update/note", {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const responseJson: createNoteAPIResponseBody = await response.json();
  return {
    status: response.status,
    message: responseJson.message,
    data: responseJson.data,
  };
}

export async function deleteNote(noteId: string) {
  const response = await fetch(
    `http://localhost:9000/delete/note?noteId=${noteId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  return response.ok;
}

interface getNotesAPIResponseBody {
  message: string;
  data: Notes[];
}

export async function getNotes(): Promise<Notes[]> {
  const response = await fetch("http://localhost:9000/notes", {
    method: "GET",
    credentials: "include",
  });
  const responseJson: getNotesAPIResponseBody = await response.json();
  return responseJson.data;
}
