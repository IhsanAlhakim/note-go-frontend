import { Outlet, useNavigate } from "react-router";
import { useUser } from "../contexts/user_context";

export default function NotesPageLayout() {
  
  const { loggedInUser } = useUser();
  const navigate = useNavigate()

  if (!loggedInUser) return (
    <div>
      <button onClick={() => navigate("/login")}>Login First</button>
    </div>
  )

  return <Outlet />;
}
