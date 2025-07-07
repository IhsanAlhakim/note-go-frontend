import { useEffect, useState } from "react";
import CreateNoteForm from "../components/note_page/CreateNoteForm";
import NoteListContainer from "../components/note_page/NoteListContainer";
import NotePageHeader from "../components/note_page/NotePageHeader";
import NotePageNav from "../components/note_page/NotePageNav";
import PagesContainer from "../components/note_page/PagesContainer";
import { useToast } from "../components/Toast";
import { SearchNotesContext } from "../contexts/filter_notes_context";
import { NotesContext } from "../contexts/notes_context";
import { unknownError } from "../errors/unknown_error";
import { getNotes } from "../network/note_api";
import { Note } from "../types/notes";
import ConfirmModalProvider from "../components/ConfirmModal";
import { ShowNavContext } from "../contexts/show_nav_context";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[] | null>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [showNav, setShowNav] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    async function loadNotes() {
      try {
        const notesData = await getNotes();
        if (notesData === null) {
          setNotes([]);
        } else {
          setNotes(notesData);
        }
      } catch (error) {
        showToast(unknownError.message[0]);
        setNotes([]);
        console.error(error);
      }
    }
    loadNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ConfirmModalProvider>
      <NotesContext.Provider value={{ notes, setNotes }}>
        <PagesContainer additionalStyles="flex flex-col">
          <SearchNotesContext.Provider value={{ keyword, setKeyword }}>
            <ShowNavContext.Provider value={{ showNav, setShowNav }}>
              <NotePageHeader />
              <div className="flex grow">
                <NotePageNav />
                <main className="grow flex flex-col max-h-[calc(100dvh-60px)] overflow-y-auto pb-8 bg-slate-100">
                  <div className="mx-auto my-10">
                    <CreateNoteForm />
                  </div>
                  <NoteListContainer />
                </main>
              </div>
            </ShowNavContext.Provider>
          </SearchNotesContext.Provider>
        </PagesContainer>
      </NotesContext.Provider>
    </ConfirmModalProvider>
  );
}
