import { LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { useSearchNotes } from "../../contexts/filter_notes_context";
import { useNotes } from "../../contexts/notes_context";
import {
  ClientError,
  isClientError,
  isServerError,
  ServerError,
  UnauthorizedErrorStatusCode,
} from "../../errors/http_error";
import { unknownError } from "../../errors/unknown_error";
import { deleteNote } from "../../network/note_api";
import { Note } from "../../types/notes";
import { useToast } from "../Toast";
import EditNoteFormModal from "./EditNoteForm";
import NoteCard from "./NoteCard";
import { useNavigate } from "react-router";

export default function NoteListContainer() {
  const noteToEditDefaultValue = {
    noteId: "",
    userId: "",
    title: "",
    text: "",
    createdAt: "",
    updatedAt: "",
  };

  const [noteToEdit, setNoteToEdit] = useState<Note>(noteToEditDefaultValue);
  const [showEditNote, setShowEditNote] = useState(false);
  const [loading, setLoading] = useState(false);

  const { notes, setNotes } = useNotes();
  const { keyword } = useSearchNotes();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleDelete = async (noteId: string) => {
    setLoading(true);
    try {
      const deleteNoteAPIResponse = await deleteNote(noteId);

      if (deleteNoteAPIResponse.status === UnauthorizedErrorStatusCode) {
        showToast("Session Expired");
        navigate("/login");
        return;
      }

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

  const updateNoteList = (updatedNote: Note) => {
    if (notes !== null) {
      const idx = notes?.findIndex(
        (note) => note.noteId === updatedNote.noteId
      );
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
      {notes && notes.length > 0 && (
        <div className="mx-auto gap-5 grow grid grid-cols-[300px] md:grid-cols-[300px_300px] lg:grid-cols-[300px_300px_300px] grid-rows-[225px]">
          {keyword && keyword !== ""
            ? notes
                .filter(
                  (note) =>
                    note.text.toLowerCase().includes(keyword.toLowerCase()) ||
                    note.title.toLowerCase().includes(keyword.toLowerCase())
                )
                .map((note) => {
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
            : notes.map((note) => {
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
              })}
        </div>
      )}

      {notes ? (
        <>
          {notes.length === 0 ? (
            <div className="flex grow justify-center mt-10">
              <p className="font-semibold text-lg">
                You haven’t created any notes yet. Start by adding one!
              </p>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <div className="flex grow justify-center mt-10 gap-2">
          <LoaderCircleIcon className="animate-spin" />
          <p className="font-semibold text-lg">Loading notes...</p>
        </div>
      )}

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
