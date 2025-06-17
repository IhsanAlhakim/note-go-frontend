import { Search } from "lucide-react";

export default function SearchNoteInput() {
  return (
    <div className="w-full h-[45px] border-2 p-1 rounded-lg flex items-center">
      <Search className="mx-4" />
      <input
        type="text"
        className="w-full h-full outline-none bg-transparent"
        placeholder="Search"
      />
    </div>
  );
}
