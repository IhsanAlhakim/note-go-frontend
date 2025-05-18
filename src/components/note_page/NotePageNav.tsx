import { Notebook } from "lucide-react";

export default function NotePageNav() {
  return (
    <nav className="w-[275px] min-w-[275px] border-r-2">
      <ul>
        <li className="flex items-center h-[70px] p-4 border-b-2 hover:bg-blue-500 hover:text-white transition-all">
          <Notebook className="mr-5" />
          <h2 className="text-lg font-semibold">Notes</h2>
          <div className="w-[40px] h-[25px] bg-blue-600 flex items-center justify-center rounded-lg ml-auto">
            <p className="text-sm font-semibold text-white">100</p>
          </div>
        </li>
      </ul>
    </nav>
  );
}
