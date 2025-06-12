import { Search } from "lucide-react";
import { useState } from "react";
import { useUser } from "../../contexts/user_context";
import { deleteUser, logout } from "../../network/user_api";
import { useNavigate } from "react-router";

export default function NotePageHeader() {
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const { loggedInUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const isUserLogout = await logout();
      if (!isUserLogout) {
        throw new Error("Server Error");
      }
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      const confirmDelete = confirm(
        "Are You Sure Want To Delete Your Account?"
      );

      if (!confirmDelete) {
        return;
      }

      const isUserDeleted = await deleteUser();
      if (!isUserDeleted) {
        throw new Error("Server Error");
      }
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="h-[60px] flex justify-center border-b-2">
      <div className="flex h-full w-[90%]">
        <div className="flex items-center w-[200px] pl-5 text-2xl">
          <h1 className="font-semibold">NoteNest</h1>
        </div>
        <div className="flex items-center w-[700px]">
          <div className="w-full h-[45px] border-2 p-1 rounded-lg flex items-center">
            <Search className="mx-4" />
            <input
              type="text"
              className="w-full h-full outline-none bg-transparent"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="grow flex justify-end items-center pr-5 relative">
          <button
            onClick={() => setShowLogoutButton(!showLogoutButton)}
            className="bg-blue-500 h-[45px] px-4 rounded-lg font-semibold text-white"
          >
            {loggedInUser?.username}
          </button>
          {showLogoutButton && (
            <div
              className={`absolute transition-all grid grid-row-2 bg-blue-500 -bottom-20 w-[150px] h-[80px] text-white rounded-lg`}
            >
              <div
                className={`border-b-2 flex justify-center items-center ${
                  loading && "bg-blue-300"
                } hover:bg-blue-300`}
              >
                <button disabled={loading} onClick={handleDeleteUser}>
                  Delete Account
                </button>
              </div>
              <div
                className={`flex justify-center items-center ${
                  loading && "bg-blue-300"
                } hover:bg-blue-300`}
              >
                <button disabled={loading} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
