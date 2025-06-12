import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { responseStatusOK } from "./errors/http_error";
import LoginSignupLayout from "./layout/LoginSignupLayout";
import NotesPageLayout from "./layout/NotePageLayout";
import { getUser } from "./network/user_api";
import LoginPage from "./pages/LoginPage";
import NotesPage from "./pages/NotesPage";
import SignUpPage from "./pages/SignUpPage";
import { UserContext } from "./contexts/user_context";

export interface User {
  email: string;
  username: string;
}

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLoggedInUser() {
      const getUserAPIResponse = await getUser();
      if (getUserAPIResponse.status !== responseStatusOK) {
        navigate("/login");
        return;
      }
      setLoggedInUser(getUserAPIResponse.data);
    }

    fetchLoggedInUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      <Routes>
        <Route element={<NotesPageLayout />}>
          <Route path="/" element={<NotesPage />} />
        </Route>
        <Route element={<LoginSignupLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
