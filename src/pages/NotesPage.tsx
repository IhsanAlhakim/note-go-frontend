import { Notebook, Search } from "lucide-react";
import React, { useRef, useState } from "react";
import AutoFocusTextArea from "../components/AutoFocusTextArea";
import NoteCard from "../components/NoteCard";
import PagesContainer from "../components/PagesContainer";

export default function NotesPage() {
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [showEditNote, setShowEditNote] = useState(false);
  const createTitleRef = useRef<HTMLTextAreaElement>(null);
  const createTextRef = useRef<HTMLTextAreaElement>(null);
  const autoResize = (ref: React.RefObject<HTMLTextAreaElement | null>) => {
    if (!ref.current) return;
    ref.current.style.height = "auto";
    ref.current.style.height = ref.current.scrollHeight + "px";
  };

  // useEffect(() => {
  //   async function loadNote() {
  //     const note = await getNotes();
  //     console.log(note);
  //   }

  //   loadNote();
  // }, []);

  return (
    <>
      <PagesContainer additionalStyles="flex flex-col">
        <header className="h-[60px] flex justify-center border-b-2">
          <div className="flex h-full w-[90%]">
            <div className="flex items-center w-[200px] pl-5 text-2xl">
              <h1 className="font-semibold">NoteNest</h1>
            </div>
            <div className="flex items-center w-[700px]">
              <div className="w-full h-[45px] border-2 p-1 rounded-lg flex items-center">
                <Search className="mx-4" />
                <input
                  type="text"
                  className="w-full h-full outline-none bg-transparent"
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="grow flex justify-end items-center pr-5 relative">
              <button
                onClick={() => setShowLogoutButton(!showLogoutButton)}
                className="bg-blue-500 h-[45px] px-4 rounded-lg font-semibold text-white"
              >
                Username
              </button>
              {showLogoutButton && (
                <div
                  className={`absolute transition-all grid grid-row-2 bg-blue-500 -bottom-20 w-[150px] h-[80px] text-white rounded-lg`}
                >
                  <div className="border-b-2 flex justify-center items-center">
                    <p>Delete Account</p>
                  </div>
                  <div className="flex justify-center items-center">
                    <p>Logout</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        <div className="flex grow">
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
          <main className="grow flex flex-col max-h-[calc(100dvh-60px)] overflow-auto pb-8">
            <div className="mx-auto my-10">
              <div className="w-[600px] max-w-[600px] min-h-[50px] border-2 px-3 rounded-lg flex-co items-center">
                {showCreateNote ? (
                  <>
                    <textarea
                      ref={createTitleRef}
                      onInput={() => autoResize(createTitleRef)}
                      autoComplete="off"
                      className="w-full mt-3 min-h-[50px] outline-none bg-transparent font-semibold text-lg resize-none"
                      placeholder="Title"
                    />
                    <textarea
                      ref={createTextRef}
                      onInput={() => autoResize(createTextRef)}
                      autoComplete="off"
                      className="w-full min-h-[50px] outline-none bg-transparent font-semibold text-lg resize-none"
                      placeholder="Take a note..."
                    />
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
                  <input
                    type="text"
                    autoComplete="off"
                    className="w-full h-[50px] outline-none bg-transparent font-semibold text-lg"
                    placeholder="Take a note..."
                    onClick={() => setShowCreateNote(!showCreateNote)}
                  />
                )}
              </div>
            </div>
            <div className="grow flex flex-row flex-wrap gap-5 justify-center">
              <NoteCard
                setShowEditNote={setShowEditNote}
                showEditNote={showCreateNote}
              />
              <NoteCard
                setShowEditNote={setShowEditNote}
                showEditNote={showCreateNote}
              />
              <NoteCard
                setShowEditNote={setShowEditNote}
                showEditNote={showCreateNote}
              />
              <NoteCard
                setShowEditNote={setShowEditNote}
                showEditNote={showCreateNote}
              />
              <NoteCard
                setShowEditNote={setShowEditNote}
                showEditNote={showCreateNote}
              />
              <NoteCard
                setShowEditNote={setShowEditNote}
                showEditNote={showCreateNote}
              />
              <NoteCard
                setShowEditNote={setShowEditNote}
                showEditNote={showCreateNote}
              />
            </div>
          </main>
        </div>
      </PagesContainer>
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
