import { Search } from "lucide-react";
import { useSearchNotes } from "../../contexts/filter_notes_context";

export default function SearchNoteInput() {
  const { keyword, setKeyword } = useSearchNotes();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
  };
  return (
    <div className="w-full h-[45px] p-1 rounded-lg flex items-center bg-slate-300">
      <Search className="mx-4" />
      <input
        id="filter"
        name="filter"
        type="text"
        value={keyword}
        onChange={handleChange}
        className="w-full h-full outline-none bg-transparent placeholder-slate-700"
        placeholder="Search"
        autoComplete="off"
      />
    </div>
  );
}
