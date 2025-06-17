import { useState } from "react";
import NoteFormTextArea from "./NoteFormTextArea";
import { updateNote } from "../../network/note_api";
import AutoFocusTextArea from "./AutoFocusTextArea";
import { useToast } from "../Toast";
import { Note } from "../../types/notes";
import {
  ClientError,
  isClientError,
  isServerError,
  ServerError,
} from "../../errors/http_error";
import { unknownError } from "../../errors/unknown_error";
import { getDate, getTime } from "../../utils/get_date_time";

interface EditNoteFormModalProps {
  noteToEdit: Note;
  setNoteToEdit: (noteToEdit: Note) => void;
  onSuccessEdit: (note: Note) => void;
  onCloseEditForm: () => void;
}

export default function EditNoteFormModal({
  noteToEdit,
  setNoteToEdit,
  onCloseEditForm,
  onSuccessEdit,
}: EditNoteFormModalProps) {
  console.log(noteToEdit);
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setNoteToEdit({
      ...noteToEdit,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updateNoteAPIResponse = await updateNote({
        noteId: noteToEdit.noteId,
        title: noteToEdit.title,
        text: noteToEdit.text,
      });

      if (isClientError(updateNoteAPIResponse.status)) {
        throw new ClientError();
      }

      if (isServerError(updateNoteAPIResponse.status)) {
        throw new ServerError();
      }

      onSuccessEdit(noteToEdit);
    } catch (err) {
      if (err instanceof ServerError || err instanceof ClientError) {
        showToast(err.desc[0]);
        return;
      }
      showToast(unknownError.message[0]);
    } finally {
      setLoading(false);
      onCloseEditForm();
    }
  };

  return (
    <>
      <div className="absolute inset-0 flex justify-center items-center z-50">
        <form onSubmit={handleSubmit}>
          <div className="w-[600px] max-w-[600px] min-h-[50px] border-2 pt-3 px-3 rounded-lg flex-col items-center bg-white">
            <AutoFocusTextArea
              id="title"
              name="title"
              value={noteToEdit.title}
              onChange={handleChange}
            />
            <NoteFormTextArea
              id="text"
              name="text"
              value={noteToEdit.text}
              onChange={handleChange}
              placeholder="Take a note"
            />
            <div className="flex font-semibold text-sm">
              <p className="ml-auto">
                Edited{" "}
                {`${getTime(noteToEdit.updatedAt)}, ${getDate(
                  noteToEdit.updatedAt
                )}`}
              </p>
            </div>
            <div className="w-full h-[50px] flex px-1 items-center">
              <button
                disabled={loading}
                type="submit"
                className={`ml-auto ${
                  loading ? "bg-blue-300" : "bg-blue-500"
                } w-[80px] h-[30px] rounded-lg font-semibold text-white`}
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
    </>
  );
}
