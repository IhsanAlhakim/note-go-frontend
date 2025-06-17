import { useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../contexts/user_context";
import {
  ClientError,
  isClientError,
  isServerError,
  ServerError,
} from "../../errors/http_error";
import { unknownError } from "../../errors/unknown_error";
import { deleteUser, logout } from "../../network/user_api";
import { useToast } from "../Toast";
import SearchNoteInput from "./SearchNoteInput";
import { useConfirm } from "../ConfirmModal";

export default function NotePageHeader() {
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const { showConfirm } = useConfirm();
  const [loading, setLoading] = useState(false);
  const { loggedInUser } = useUser();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const logoutAPIResponse = await logout();
      if (isClientError(logoutAPIResponse.status)) {
        throw new ClientError();
      }

      if (isServerError(logoutAPIResponse.status)) {
        throw new ServerError();
      }
      navigate("/login");
    } catch (err) {
      if (err instanceof ServerError || err instanceof ClientError) {
        showToast(err.desc[0]);
        return;
      }
      showToast(unknownError.message[0]);
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
          <SearchNoteInput />
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
                <button
                  disabled={loading}
                  onClick={() =>
                    showConfirm("Yakin Logout", () => handleDeleteUser())
                  }
                >
                  Delete Account
                </button>
              </div>
              <div
                className={`flex justify-center items-center ${
                  loading && "bg-blue-300"
                } hover:bg-blue-300`}
              >
                <button
                  disabled={loading}
                  onClick={() =>
                    showConfirm("Yakin Logout", () => handleLogout())
                  }
                >
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
