export async function getNotes() {
  const response = await fetch(
    "http://localhost:9000/notes?userId=680f440987ebc6d2ed945b1c",
    {
      method: "GET",
    }
  );
  return response.json();
}

interface createNoteBody {
  title: string;
  text: string;
}

interface createNoteResponseData {
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
