import { createContext, useContext } from "react";
import { User } from "../App";

export const NotePageContext = createContext<User | undefined>(undefined);
export function useUser() {
  const context = useContext(NotePageContext);
  if (!context)
    throw new Error("useUser must be used within an NotePageProvider");
  return context;
}
