import { Notebook } from "lucide-react";
import { useNotes } from "../../contexts/notes_context";

export default function NotePageNav() {
  const { notes } = useNotes();
  return (
    <nav className="w-[275px] min-w-[275px] bg-blue-600">
      <ul>
        <li className="flex items-center h-[70px] p-4 transition-all text-white border-l-8 border-white">
          <Notebook className="mr-5" />
          <h2 className="text-lg font-semibold">Notes</h2>
          <div className="w-[40px] h-[25px] bg-blue-400 flex items-center justify-center rounded-lg ml-auto">
            <p className="text-sm font-semibold">
              {notes && notes?.length > 0 ? notes.length : 0}
            </p>
          </div>
        </li>
      </ul>
    </nav>
  );
}
