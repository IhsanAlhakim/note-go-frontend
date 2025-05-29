import { useEffect, useState } from "react";
import CreateNoteForm from "../components/note_page/CreateNoteForm";
import NoteListContainer from "../components/note_page/NoteListContainer";
import NotePageHeader from "../components/note_page/NotePageHeader";
import NotePageNav from "../components/note_page/NotePageNav";
import PagesContainer from "../components/note_page/PagesContainer";
import { createNoteResponseData, getNotes } from "../network/note_api";

export default function NotesPage() {
  const [notes, setNotes] = useState<createNoteResponseData[] | null>(null);
  useEffect(() => {
    async function loadNote() {
      const notesData = await getNotes();
      setNotes(notesData.reverse());
    }
    loadNote();
  }, []);

  return (
    <>
      <PagesContainer additionalStyles="flex flex-col">
        <NotePageHeader />
        <div className="flex grow">
          <NotePageNav />
          <main className="grow flex flex-col max-h-[calc(100dvh-60px)] overflow-auto pb-8">
            <div className="mx-auto my-10">
              <CreateNoteForm />
            </div>
            <NoteListContainer notes={notes} setNotes={setNotes} />
          </main>
        </div>
      </PagesContainer>
    </>
  );
}
