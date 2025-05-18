import { useRef } from "react";

interface NoteFormTextAreaProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}

export default function NoteFormTextArea({
  id,
  name,
  value,
  onChange,
  placeholder,
}: NoteFormTextAreaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const autoResize = (ref: React.RefObject<HTMLTextAreaElement | null>) => {
    if (!ref.current) return;
    ref.current.style.height = "auto";
    ref.current.style.height = ref.current.scrollHeight + "px";
  };
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      ref={textAreaRef}
      onInput={() => autoResize(textAreaRef)}
      autoComplete="off"
      className="w-full mt-3 min-h-[50px] outline-none bg-transparent font-semibold text-lg resize-none"
      placeholder={placeholder}
    />
  );
}
