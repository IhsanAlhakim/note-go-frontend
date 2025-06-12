import { createContext, useContext } from "react";
import { Notes } from "../types/notes";

interface NotesContext {
  notes: Notes[] | null;
  setNotes: (notes: Notes[]) => void;
}

export const NotesContext = createContext<NotesContext | undefined>(undefined);

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context)
    throw new Error("useNotes must be used within an NotesContextProvider");
  return context;
}
