import { useState } from "react";
import { useNavigate } from "react-router";
import { User } from "../App";
import LoginSignUpInputBox from "../components/login_page/LoginSignUpInputBox";
import {
  NotFoundError,
  notFoundErrorStatusCode,
  responseStatusOK,
  ServerError,
} from "../errors/http_error";
import { unknownError } from "../errors/unknown_error";
import { ValidationError } from "../errors/validation_error";
import { loginFormSchema } from "../libs/validation";
import { login } from "../network/user_api";
import { formError } from "../types/FormError";

export interface userDataBody {
  username: string;
  password: string;
}

interface LoginPageProps {
  setLoggedInUser: (loggedInUser: User) => void;
}

export default function LoginPage({ setLoggedInUser }: LoginPageProps) {
  const userDataDefaultValue = {
    username: "",
    password: "",
  };

  const [userData, setUserData] = useState<userDataBody>(userDataDefaultValue);

  const [error, setError] = useState<formError | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const validate = loginFormSchema.safeParse({
        username: userData.username,
        password: userData.password,
      });

      if (!validate.success) {
        const errorDesc = validate.error.issues.map((issue) => issue.message);
        throw new ValidationError(errorDesc);
      }

      const loginAPIResponse = await login({
        username: userData.username,
        password: userData.password,
      });

      if (loginAPIResponse.status == notFoundErrorStatusCode) {
        throw new NotFoundError(loginAPIResponse.message);
      }

      if (loginAPIResponse.status != responseStatusOK) {
        throw new ServerError();
      }

      setError(null);
      setUserData(userDataDefaultValue);
      setLoggedInUser({
        username: loginAPIResponse.data.username,
        email: loginAPIResponse.data.email,
      });
      navigate("/");
    } catch (err) {
      if (
        err instanceof ValidationError ||
        err instanceof ServerError ||
        err instanceof NotFoundError
      ) {
        setError({ errorTitle: err.name, errorDesc: err.desc });
        return;
      }
      setError({
        errorTitle: unknownError.title,
        errorDesc: unknownError.message,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-700 rounded p-2 mb-2 text-white">
            <p className="font-semibold">{error.errorTitle}</p>
            <ol className="list-disc text-md ml-4">
              {error.errorDesc.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ol>
          </div>
        )}
        <LoginSignUpInputBox
          title="Username"
          name="username"
          id="username"
          type="text"
          value={userData.username}
          onChange={handleChange}
          placeholder="Insert Your Account Username"
          additionalStyles="mb-5"
        />

        <LoginSignUpInputBox
          title="Password"
          name="password"
          id="password"
          type="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Insert Your Account Password"
        />
        <div
          className={`w-full mt-10 flex justify-center ${
            loading ? "bg-blue-300" : "bg-blue-700"
          } text-white p-3 rounded-3xl font-semibold`}
        >
          <button type="submit" disabled={loading}>
            Login
          </button>
        </div>
      </form>
      <div className="flex justify-center mt-10">
        Need an account?
        <a
          href="/signup"
          className="ml-1 text-blue-800 hover:text-black underline"
        >
          SIGNUP
        </a>
      </div>
    </>
  );
}
