import { Note } from "../../types/notes";
import { getDate } from "../../utils/get_date_time";
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
      className="w-[300px] h-[225px] rounded-2xl wrap-anywhere py-3 px-5 flex flex-col font-semibold bg-white cursor-pointer hover:shadow-lg transition-shadow mx-auto"
    >
      <div className="mb-4 text-xl line-clamp-2">
        <h3>{note.title}</h3>
      </div>
      <div className="text-md text-slate-500 line-clamp-4">
        <p>{note.text}</p>
      </div>
      <div className="mt-auto flex text-sm text-slate-400">
        <div>
          <p>{getDate(note.createdAt)}</p>
        </div>
        <div className="ml-auto">
          <button
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              showConfirm("Are you sure want to delete this note?", () =>
                handleDelete(note.noteId)
              );
            }}
            disabled={loading}
            className={`ml-auto ${
              loading ? "bg-blue-400" : "bg-blue-600"
            } w-[80px] h-[30px] rounded-lg font-semibold text-white cursor-pointer hover:bg-blue-900 transition-colors`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
