import { createContext, useContext } from "react";

interface SearchNotesContext {
  keyword: string | undefined;
  setKeyword: (filter: string) => void;
}

export const SearchNotesContext = createContext<SearchNotesContext | undefined>(
  undefined
);

export function useSearchNotes() {
  const context = useContext(SearchNotesContext);
  if (!context)
    throw new Error(
      "useSearchNotes must be used within an SearchNotesProvider"
    );
  return context;
}
