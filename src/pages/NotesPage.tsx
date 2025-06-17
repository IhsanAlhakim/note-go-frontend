import { useEffect, useState } from "react";
import CreateNoteForm from "../components/note_page/CreateNoteForm";
import NoteListContainer from "../components/note_page/NoteListContainer";
import NotePageHeader from "../components/note_page/NotePageHeader";
import NotePageNav from "../components/note_page/NotePageNav";
import PagesContainer from "../components/note_page/PagesContainer";
import { SearchNotesContext } from "../contexts/filter_notes_context";
import { NotesContext } from "../contexts/notes_context";
import { getNotes } from "../network/note_api";
import { Note } from "../types/notes";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[] | null>(null);
  const [keyword, setKeyword] = useState<string>("");
  useEffect(() => {
    async function loadNote() {
      const notesData = await getNotes();
      setNotes(notesData);
    }
    loadNote();
  }, []);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      <PagesContainer additionalStyles="flex flex-col">
        <SearchNotesContext.Provider value={{ keyword, setKeyword }}>
          <NotePageHeader />
          <div className="flex grow">
            <NotePageNav />
            <main className="grow flex flex-col max-h-[calc(100dvh-60px)] overflow-auto pb-8">
              <div className="mx-auto my-10">
                <CreateNoteForm />
              </div>
              <NoteListContainer />
            </main>
          </div>
        </SearchNotesContext.Provider>
      </PagesContainer>
    </NotesContext.Provider>
  );
}
