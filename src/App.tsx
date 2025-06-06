import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import LoginSignupLayout from "./layout/LoginSignupLayout";
import NotesPageLayout from "./layout/NotePageLayout";
import LoginPage from "./pages/LoginPage";
import NotesPage from "./pages/NotesPage";
import SignUpPage from "./pages/SignUpPage";
import { getUser } from "./network/user_api";
import {
  NotFoundError,
  notFoundErrorStatusCode,
  responseStatusOK,
  ServerError,
} from "./errors/http_error";
import { useToast } from "./components/Toast";

export interface User {
  email: string;
  username: string;
}

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const getUserAPIResponse = await getUser();
        if (getUserAPIResponse.status == notFoundErrorStatusCode) {
          throw new NotFoundError("User Not Found");
        }

        if (getUserAPIResponse.status !== responseStatusOK) {
          throw new ServerError();
        }
        setLoggedInUser(getUserAPIResponse.data);
      } catch (error) {
        if (error instanceof ServerError) {
          showToast(
            "Something went wrong on our server. Please try again later"
          );
        }
        navigate("/login");
      }
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
