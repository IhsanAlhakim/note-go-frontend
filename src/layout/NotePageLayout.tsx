import { Outlet } from "react-router";
import { User } from "../App";
import { NotePageContext } from "../contexts/NotePageContext";

interface NotesPageLayoutProps {
  loggedInUser: User | null;
}

export default function NotesPageLayout({
  loggedInUser,
}: NotesPageLayoutProps) {
  if (!loggedInUser) return;

  return (
    <NotePageContext.Provider value={loggedInUser}>
      <Outlet />
    </NotePageContext.Provider>
  );
}
