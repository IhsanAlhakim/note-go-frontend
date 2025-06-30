import { CircleUser, Menu, X } from "lucide-react";
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
import { useConfirm } from "../ConfirmModal";
import { useToast } from "../Toast";
import SearchNoteInput from "./SearchNoteInput";

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
      const deleteUserAPIResponse = await deleteUser();
      if (isClientError(deleteUserAPIResponse.status)) {
        throw new ClientError();
      }

      if (isServerError(deleteUserAPIResponse.status)) {
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

  return (
    <header className="h-[60px] flex justify-center">
      <div className="flex h-full w-full">
        <div className="flex items-center w-[275px] text-2xl justify-center bg-blue-900 text-white">
          <h1 className="font-semibold">NoteNest</h1>
        </div>
        <div className="flex items-center w-[700px] ml-10">
          <SearchNoteInput />
        </div>
        <div className="grow flex justify-end items-center pr-10 relative gap-5">
          <div className="flex flex-row justify-center items-center gap-2 font-semibold text-md">
            <CircleUser />
            {loggedInUser?.username}
          </div>
          <button
            className={`p-2 hover:bg-blue-600 rounded-xl hover:text-white transition-all ${
              showLogoutButton && "bg-blue-600 text-white"
            }`}
            onClick={() => setShowLogoutButton(!showLogoutButton)}
          >
            {showLogoutButton ? <X /> : <Menu />}
          </button>
          {showLogoutButton && (
            <div
              className={`absolute transition-all grid grid-row-2 bg-blue-600 -bottom-20 w-[150px] h-[80px] text-white rounded-lg`}
            >
              <div
                className={`border-b-2 rounded-t-lg flex justify-center items-center ${
                  loading && "bg-blue-400"
                } hover:bg-blue-900 transition-all`}
              >
                <button
                  disabled={loading}
                  onClick={() =>
                    showConfirm(
                      "Are you sure you want to delete your account?",
                      () => handleDeleteUser()
                    )
                  }
                >
                  Delete Account
                </button>
              </div>
              <div
                className={`rounded-b-lg flex justify-center items-center ${
                  loading && "bg-blue-400"
                } hover:bg-blue-900 transition-all`}
              >
                <button
                  disabled={loading}
                  onClick={() =>
                    showConfirm("Are you sure want to Logout?", () =>
                      handleLogout()
                    )
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
