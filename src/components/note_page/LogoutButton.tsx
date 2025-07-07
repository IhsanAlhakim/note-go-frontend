import { useState } from "react";
import {
  ClientError,
  isClientError,
  isServerError,
  ServerError,
} from "../../errors/http_error";
import { useNavigate } from "react-router";
import { logout } from "../../network/user_api";
import { useToast } from "../Toast";
import { unknownError } from "../../errors/unknown_error";
import { useConfirm } from "../ConfirmModal";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { showConfirm } = useConfirm();

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

  return (
    <div
      className={`flex justify-center items-center ${
        loading && "bg-blue-400"
      } hover:bg-blue-900 transition-all`}
    >
      <button
        disabled={loading}
        onClick={() =>
          showConfirm("Are you sure want to Logout?", () => handleLogout())
        }
      >
        Logout
      </button>
    </div>
  );
}
