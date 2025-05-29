import { useState } from "react";
import { createNoteResponseData } from "../../network/note_api";
import EditNoteFormModal from "./EditNoteForm";
import NoteCard from "./NoteCard";

interface NoteListContainerProps {
  notes: createNoteResponseData[] | null;
  setNotes: (notes: createNoteResponseData[]) => void;
}

export default function NoteListContainer({
  notes,
  setNotes,
}: NoteListContainerProps) {
  const [showEditNote, setShowEditNote] = useState(false);

  const noteToEditDefaultValue = {
    noteId: "",
    userId: "",
    title: "",
    text: "",
    createdAt: "",
    updatedAt: "",
  };

  const [noteToEdit, setNoteToEdit] = useState<createNoteResponseData>(
    noteToEditDefaultValue
  );

  const updateNoteList = (updatedNote: createNoteResponseData) => {
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
