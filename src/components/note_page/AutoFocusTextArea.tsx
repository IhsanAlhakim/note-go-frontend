import { useEffect, useRef } from "react";

interface AutoFocusTextAreaProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function AutoFocusTextArea({
  id,
  name,
  value,
  onChange,
}: AutoFocusTextAreaProps) {
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

      // textArea.style.height = "auto"; // reset dulu
      textArea.style.height = textArea.scrollHeight + "px"; // sesuaikan dengan isi
    }
  }, []);

  return (
    <textarea
      id={id}
      name={name}
      ref={textAreaRef}
      onInput={() => autoResize(textAreaRef)}
      onChange={onChange}
      autoComplete="off"
      className="w-full min-h-[50px] outline-none bg-transparent font-semibold text-lg resize-none"
      placeholder="Title"
      value={value}
    />
  );
}
