import { Note } from "../../types/notes";
import { useConfirm } from "../ConfirmModal";

interface NoteCardProps {
  note: Note;
  onClickNote: () => void;
  loading: boolean;
  handleDelete: (noteId: string) => void;
}

export default function NoteCard({
  note,
  onClickNote,
  loading,
  handleDelete,
}: NoteCardProps) {
  const { showConfirm } = useConfirm();
  return (
    <div
      onClick={onClickNote}
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
          <button
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              showConfirm("Yakin Hapus?", () => handleDelete(note.noteId));
            }}
            disabled={loading}
            className={`ml-auto ${
              loading ? "bg-blue-300" : "bg-blue-500"
            } w-[80px] h-[30px] rounded-lg font-semibold text-white`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
