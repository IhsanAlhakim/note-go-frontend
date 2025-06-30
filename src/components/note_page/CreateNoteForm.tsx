import { useState } from "react";
import { useNotes } from "../../contexts/notes_context";
import {
  ClientError,
  isClientError,
  isServerError,
  ServerError,
  UnauthorizedErrorStatusCode,
} from "../../errors/http_error";
import { unknownError } from "../../errors/unknown_error";
import { createNote } from "../../network/note_api";
import { useToast } from "../Toast";
import NoteFormTextArea from "./NoteFormTextArea";
import NoteFormTextInput from "./NoteFormTextInput";
import { useNavigate } from "react-router";

interface newNoteDataBody {
  title: string;
  text: string;
}

export default function CreateNoteForm() {
  const { notes, setNotes } = useNotes();

  const navigate = useNavigate();

  const newNoteDataDefaultValue = {
    title: "",
    text: "",
  };
  const [newNoteData, setNewNoteData] = useState<newNoteDataBody>(
    newNoteDataDefaultValue
  );

  const [loading, setLoading] = useState(false);
  const [showCreateNote, setShowCreateNote] = useState(false);

  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewNoteData({
      ...newNoteData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (newNoteData.title === "" && newNoteData.text === "") return;
      setLoading(true);
      const createNoteAPIResponse = await createNote({
        title: newNoteData.title,
        text: newNoteData.text,
      });

      if (createNoteAPIResponse.status === UnauthorizedErrorStatusCode) {
        showToast("Session Expired");
        navigate("/login");
        return;
      }

      if (isClientError(createNoteAPIResponse.status)) {
        throw new ClientError();
      }

      if (isServerError(createNoteAPIResponse.status)) {
        throw new ServerError();
      }

      showToast("Note Created");
      setNewNoteData(newNoteDataDefaultValue);
      if (!notes) {
        setNotes([createNoteAPIResponse.data]);
        return;
      }
      setNotes([createNoteAPIResponse.data, ...notes]);
    } catch (err) {
      if (err instanceof ServerError || err instanceof ClientError) {
        showToast(err.desc[0]);
        return;
      }
      showToast(unknownError.message[0]);
    } finally {
      setShowCreateNote(false);
      setLoading(false);
    }
  };

  return (
    <div className="w-[600px] max-w-[600px] min-h-[50px] px-3 rounded-lg flex-co items-center bg-white">
      {showCreateNote ? (
        <form onSubmit={handleSubmit}>
          <NoteFormTextArea
            id="title"
            name="title"
            value={newNoteData.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <NoteFormTextArea
            id="text"
            name="text"
            value={newNoteData.text}
            onChange={handleChange}
            placeholder="Take a note"
          />
          <div className="w-full h-[50px] flex px-1 items-center">
            <button
              disabled={loading}
              type="submit"
              className={`ml-auto  ${
                loading ? "bg-blue-300" : "bg-blue-500"
              } hover:bg-blue-500 w-[80px] h-[30px] rounded-lg font-semibold text-white`}
            >
              Close
            </button>
          </div>
        </form>
      ) : (
        <NoteFormTextInput onClick={() => setShowCreateNote(true)} />
      )}
    </div>
  );
}
