import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { User } from "../App";
import { UserContext } from "../contexts/user_context";
import { responseStatusOK } from "../errors/http_error";
import { getUser } from "../network/user_api";
import { useToast } from "../components/Toast";
import { unknownError } from "../errors/unknown_error";
import { LoaderCircleIcon } from "lucide-react";

export default function NotesPageLayout() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const getUserAPIResponse = await getUser();
        if (getUserAPIResponse.status !== responseStatusOK) {
          navigate("/login");
          return;
        }
        setLoggedInUser(getUserAPIResponse.data);
      } catch (error) {
        console.error(error);
        showToast(unknownError.message[0]);
        navigate("/login");
      }
    }

    fetchLoggedInUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loggedInUser ? (
        <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
          <Outlet />
        </UserContext.Provider>
      ) : (
        <div className="flex w-full min-h-dvh justify-center items-center">
          <LoaderCircleIcon className="animate-spin w-16 h-16 text-blue-500" />
        </div>
      )}
    </>
  );
}
