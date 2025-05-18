import { useState } from "react";
import NoteFormTextArea from "./NoteFormTextArea";
import NoteFormTextInput from "./NoteFormTextInput";

export default function CreateNoteForm() {
  const [showCreateNote, setShowCreateNote] = useState(false);

  return (
    <div className="w-[600px] max-w-[600px] min-h-[50px] border-2 px-3 rounded-lg flex-co items-center">
      {showCreateNote ? (
        <>
          <NoteFormTextArea id="title" name="title" placeholder="Title" />
          <NoteFormTextArea id="text" name="text" placeholder="Take a note" />
          <div className="w-full h-[50px] flex px-1 items-center">
            <button
              onClick={() => setShowCreateNote(!showCreateNote)}
              className="ml-auto bg-blue-500 w-[80px] h-[30px] rounded-lg font-semibold text-white"
            >
              Close
            </button>
          </div>
        </>
      ) : (
        <NoteFormTextInput onClick={() => setShowCreateNote(!showCreateNote)} />
      )}
    </div>
  );
}
