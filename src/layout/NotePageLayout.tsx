import { useEffect } from "react";
import { Outlet } from "react-router";

// interface NotesPageLayoutProps {
//   loggedInUser: User | null;
// }

export default function NotesPageLayout() {
  //   const navigate = useNavigate();
  useEffect(() => {
    // if (!loggedInUser) {
    //   navigate("/login");
    // }
    async function Auth() {
      const response = await fetch("http://localhost:9000/user", {
        method: "GET",
        credentials: "include",
      });
      const responseJson = await response.json();
      console.log(responseJson);
    }
    Auth();
  }, []);
  return <Outlet />;
}
