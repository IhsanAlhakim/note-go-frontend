interface createNoteBody {
  title: string;
  text: string;
}

export interface createNoteResponseData {
  noteId: string;
  userId: string;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

interface createNoteResponseBody {
  message: string;
  data: createNoteResponseData;
}

export async function createNote(data: createNoteBody): Promise<{
  status: number;
  message: string;
  data: createNoteResponseData;
}> {
  const response = await fetch("http://localhost:9000/create/note", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const responseJson: createNoteResponseBody = await response.json();
  return {
    status: response.status,
    message: responseJson.message,
    data: responseJson.data,
  };
}

interface updateNoteBody {
  noteId: string;
  title: string;
  text: string;
}

export async function updateNote(data: updateNoteBody): Promise<{
  status: number;
  message: string;
  data: createNoteResponseData;
}> {
  const response = await fetch("http://localhost:9000/update/note", {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const responseJson: createNoteResponseBody = await response.json();
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

interface getNotesResponseBody {
  message: string;
  data: createNoteResponseData[];
}

export async function getNotes(): Promise<createNoteResponseData[]> {
  const response = await fetch("http://localhost:9000/notes", {
    method: "GET",
    credentials: "include",
  });
  const responseJson: getNotesResponseBody = await response.json();
  return responseJson.data;
}
