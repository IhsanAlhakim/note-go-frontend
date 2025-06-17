import { Navigate, Outlet } from "react-router";
import { useUser } from "../contexts/user_context";

export default function NotesPageLayout() {
  
  const { loggedInUser } = useUser();

  if (!loggedInUser) return <Navigate to={"/login"}/>
  
  return <Outlet />;
}
