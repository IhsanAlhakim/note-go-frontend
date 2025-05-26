import { createNoteResponseData } from "../../network/note_api";

interface NoteCardProps {
  note: createNoteResponseData
  showEditNote: boolean;
  setShowEditNote: (val: boolean) => void;
}

export default function NoteCard({
  note,
  showEditNote,
  setShowEditNote,
}: NoteCardProps) {
  return (
    <div
      onClick={() => setShowEditNote(!showEditNote)}
      className="w-[300px] h-[200px] overflow-auto rounded-2xl py-3 px-5 flex flex-col font-semibold border-2 border-black"
    >
      <div className="mb-4 text-xl">
        <h3>{note.title}</h3>
      </div>
      <div className="text-md">
        <p>{note.text}</p>
      </div>
      <div className="mt-auto flex text-sm">
        <div>
          <p>09.38PM</p>
        </div>
        <div className="ml-auto">
          <p>07 January 2025</p>
        </div>
      </div>
    </div>
  );
}
