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
  return (
    <Routes>
      <Route element={<NotesPageLayout />}>
        <Route path="/" element={<NotesPage />} />
      </Route>
      <Route element={<LoginSignupLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

export default App;
