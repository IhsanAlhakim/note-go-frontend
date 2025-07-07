import { Notebook } from "lucide-react";
import { useNotes } from "../../contexts/notes_context";
import { useShowNav } from "../../contexts/show_nav_context";

export default function NotePageNav() {
  const { notes } = useNotes();
  const { showNav, setShowNav } = useShowNav();
  return (
    <>
      <div
        onClick={() => setShowNav(false)}
        className={`${
          showNav ? "block" : "hidden"
        } fixed inset-0 bg-black/50 z-10 transition-all duration-300 lg:hidden`}
      ></div>
      <nav
        className={`fixed h-dvh lg:h-[calc(100dvh-60px)] lg:static top-0 ${
          !showNav ? "w-0" : "w-[275px]"
        }  lg:w-[275px] lg:min-w-[275px] bg-blue-600 overflow-hidden transition-all duration-300 z-20`}
      >
        <div className="w-[275px]">
          <div className="flex lg:hidden h-[60px] items-center text-2xl justify-center bg-blue-900 text-white">
            <h1 className="font-semibold">NoteNest</h1>
          </div>
          <ul className="relative">
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
        </div>
      </nav>
    </>
  );
}
