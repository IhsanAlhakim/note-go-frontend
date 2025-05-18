import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import LoginSignupLayout from "./layout/LoginSignupLayout";
import NotesPageLayout from "./layout/NotePageLayout";
import LoginPage from "./pages/LoginPage";
import NotesPage from "./pages/NotesPage";
import SignUpPage from "./pages/SignUpPage";
import { getUser } from "./network/user_api";

export interface User {
  email: string;
  username: string;
}

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLoggedInUser() {
      const userData = await getUser();
      if (!userData) {
        navigate("/login");
        return;
      }
      setLoggedInUser(userData);
    }

    fetchLoggedInUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route element={<NotesPageLayout loggedInUser={loggedInUser} />}>
        <Route path="/" element={<NotesPage />} />
      </Route>
      <Route element={<LoginSignupLayout />}>
        <Route
          path="/login"
          element={<LoginPage setLoggedInUser={setLoggedInUser} />}
        />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

export default App;
