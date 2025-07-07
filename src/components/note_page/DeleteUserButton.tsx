import { useState } from "react";
import { deleteUser } from "../../network/user_api";
import {
  ClientError,
  isClientError,
  isServerError,
  ServerError,
  UnauthorizedErrorStatusCode,
} from "../../errors/http_error";
import { useNavigate } from "react-router";
import { useToast } from "../Toast";
import { useConfirm } from "../ConfirmModal";
import { unknownError } from "../../errors/unknown_error";

export default function DeleteUserButton() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { showConfirm } = useConfirm();

  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      const deleteUserAPIResponse = await deleteUser();

      if (deleteUserAPIResponse.status === UnauthorizedErrorStatusCode) {
        showToast("Session Expired");
        navigate("/login");
        return;
      }

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
    <div
      className={`border-b-2 flex justify-center items-center ${
        loading && "bg-blue-400"
      } hover:bg-blue-900 transition-all`}
    >
      <button
        disabled={loading}
        onClick={() =>
          showConfirm("Are you sure you want to delete your account?", () =>
            handleDeleteUser()
          )
        }
      >
        Delete Account
      </button>
    </div>
  );
}
