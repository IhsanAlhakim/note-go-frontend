import { useState } from "react";
import { Route, Routes } from "react-router";
import LoginSignupLayout from "./layout/LoginSignupLayout";
import NotesPageLayout from "./layout/NotePageLayout";
import LoginPage from "./pages/LoginPage";
import NotesPage from "./pages/NotesPage";
import SignUpPage from "./pages/SignUpPage";

export interface User {
  email: string;
  username: string;
}

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  // useEffect(() => {
  //   async function fetchLoggedInUser() {}
  // }, []);

  return (
    <Routes>
      <Route element={<NotesPageLayout />}>
        <Route path="/:category?" element={<NotesPage />} />
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
