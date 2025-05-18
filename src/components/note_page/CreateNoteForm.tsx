import { useRef, useState } from "react";

export default function CreateNoteForm() {
  const [showCreateNote, setShowCreateNote] = useState(false);
  const createTitleRef = useRef<HTMLTextAreaElement>(null);
  const createTextRef = useRef<HTMLTextAreaElement>(null);
  const autoResize = (ref: React.RefObject<HTMLTextAreaElement | null>) => {
    if (!ref.current) return;
    ref.current.style.height = "auto";
    ref.current.style.height = ref.current.scrollHeight + "px";
  };
  return (
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
  );
}
