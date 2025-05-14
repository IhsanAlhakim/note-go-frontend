import { Route, Routes } from "react-router";
import LoginSignupLayout from "./layout/LoginSignupLayout";
import LoginPage from "./pages/LoginPage";
import NotesPage from "./pages/NotesPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <Routes>
      <Route path="/:category?" element={<NotesPage />} />
      <Route element={<LoginSignupLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

export default App;
