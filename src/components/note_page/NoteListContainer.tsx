import React, { useRef, useState } from "react";
import { createNoteResponseData } from "../../network/note_api";
import AutoFocusTextArea from "./AutoFocusTextArea";
import NoteCard from "./NoteCard";

interface NoteListContainerProps {
  notes: createNoteResponseData[] | null
}

export default function NoteListContainer({notes}:NoteListContainerProps) {
  const [showEditNote, setShowEditNote] = useState(false);
  const createTextRef = useRef<HTMLTextAreaElement>(null);
  const autoResize = (ref: React.RefObject<HTMLTextAreaElement | null>) => {
    if (!ref.current) return;
    ref.current.style.height = "auto";
    ref.current.style.height = ref.current.scrollHeight + "px";
  };
  return (
    <>
      <div className="grow flex flex-row flex-wrap gap-5 justify-center">
        {notes ? (notes.map(note => {
          return (
        <NoteCard
        note={note}
        key={note.noteId}
          setShowEditNote={setShowEditNote}
          showEditNote={showEditNote}
        />
          )
        })):(<div>No Note</div>)}
        
      </div>
      {showEditNote && (
        <>
          <div className="absolute inset-0 flex justify-center items-center z-50">
            <div className="w-[600px] max-w-[600px] min-h-[50px] border-2 pt-3 px-3 rounded-lg flex-col items-center bg-white">
              <AutoFocusTextArea />
              <textarea
                ref={createTextRef}
                onInput={() => autoResize(createTextRef)}
                autoComplete="off"
                className="w-full min-h-[50px] outline-none bg-transparent font-semibold text-lg resize-none"
                placeholder="Take a note..."
                value={"Ini Isi Note"}
              />
              <div className="flex font-semibold text-sm">
                <p className="ml-auto">Edited Nov 19, 2024</p>
              </div>
              <div className="w-full h-[50px] flex px-1 items-center">
                <button
                  onClick={() => setShowEditNote(!showEditNote)}
                  className="ml-auto bg-blue-500 w-[80px] h-[30px] rounded-lg font-semibold text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        </>
      )}
    </>
  );
}
