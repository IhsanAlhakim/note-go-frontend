import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { User } from "../App";
import { UserContext } from "../contexts/user_context";
import { responseStatusOK } from "../errors/http_error";
import { getUser } from "../network/user_api";

export default function NotesPageLayout() {
  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

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
        console.log(error);
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
        ""
      )}
    </>
  );
}
