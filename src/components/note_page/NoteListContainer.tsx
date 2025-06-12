import { useState } from "react";
import { useNotes } from "../../contexts/notes_context";
import { deleteNote } from "../../network/note_api";
import { Notes } from "../../types/notes";
import { useToast } from "../Toast";
import EditNoteFormModal from "./EditNoteForm";
import NoteCard from "./NoteCard";
import {
  ClientError,
  isClientError,
  isServerError,
  ServerError,
} from "../../errors/http_error";
import { unknownError } from "../../errors/unknown_error";

export default function NoteListContainer() {
  const { notes, setNotes } = useNotes();

  const [showEditNote, setShowEditNote] = useState(false);

  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);

  const handleDelete = async (noteId: string) => {
    setLoading(true);
    try {
      const deleteNoteAPIResponse = await deleteNote(noteId);
      if (isClientError(deleteNoteAPIResponse.status)) {
        throw new ClientError();
      }

      if (isServerError(deleteNoteAPIResponse.status)) {
        throw new ServerError();
      }

      showToast("Note Deleted");

      if (notes) {
        const updatedNotes = notes?.filter((note) => note.noteId !== noteId);
        setNotes(updatedNotes);
      }
    } catch (err) {
      if (err instanceof ServerError || err instanceof ClientError) {
        showToast(err.desc[0]);
        return;
      }
      showToast(unknownError.message[0]);
    } finally {
      setLoading(false);
    }
  };

  const noteToEditDefaultValue = {
    noteId: "",
    userId: "",
    title: "",
    text: "",
    createdAt: "",
    updatedAt: "",
  };

  const [noteToEdit, setNoteToEdit] = useState<Notes>(noteToEditDefaultValue);

  const updateNoteList = (updatedNote: Notes) => {
    if (notes !== null) {
      const idx = notes?.findIndex(
        (note) => note.noteId === updatedNote.noteId
      );
      console.log(idx);
      if (idx !== -1) {
        const updatedNotes = [...notes];
        updatedNotes[idx] = updatedNote;
        setNotes(updatedNotes);
        setNoteToEdit(noteToEditDefaultValue);
      }
    }
  };
  return (
    <>
      <div className="grow flex flex-row flex-wrap gap-5 justify-center">
        {notes ? (
          notes.map((note) => {
            return (
              <NoteCard
                note={note}
                key={note.noteId}
                onClickNote={() => {
                  setShowEditNote(true);
                  setNoteToEdit(note);
                }}
                loading={loading}
                handleDelete={handleDelete}
              />
            );
          })
        ) : (
          <div>No Note</div>
        )}
      </div>
      {showEditNote && (
        <EditNoteFormModal
          noteToEdit={noteToEdit}
          setNoteToEdit={setNoteToEdit}
          onCloseEditForm={() => {
            setShowEditNote(false);
          }}
          onSuccessEdit={updateNoteList}
        />
      )}
    </>
  );
}
