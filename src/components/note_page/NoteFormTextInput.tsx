interface NoteFormTextInputProps {
  onClick: () => void;
}

export default function NoteFormTextInput({ onClick }: NoteFormTextInputProps) {
  return (
    <input
      type="text"
      autoComplete="off"
      className="w-full h-[50px] outline-none bg-transparent font-semibold text-lg"
      placeholder="Take a note..."
      onClick={onClick}
    />
  );
}
