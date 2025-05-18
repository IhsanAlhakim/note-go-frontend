import { useEffect, useRef } from "react";

export default function AutoFocusTextArea() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const autoResize = (ref: React.RefObject<HTMLTextAreaElement | null>) => {
    if (!ref.current) return;
    ref.current.style.height = "auto";
    ref.current.style.height = ref.current.scrollHeight + "px";
  };

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.focus();
      const length = textArea.value.length;
      textArea.setSelectionRange(length, length);
    }
  }, []);

  return (
    <textarea
      ref={textAreaRef}
      onInput={() => autoResize(textAreaRef)}
      autoComplete="off"
      className="w-full min-h-[50px] outline-none bg-transparent font-semibold text-lg resize-none"
      placeholder="Title"
      value={"Ini Judul Note"}
    />
  );
}
