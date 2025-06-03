import { useState } from "react";
import LoginSignUpInputBox from "../components/login_page/LoginSignUpInputBox";
import {
  conflicErrorStatusCode,
  ConflictError,
  ServerError,
} from "../errors/http_error";
import { ValidationError } from "../errors/validation_error";
import { signUpFormSchema } from "../libs/validation";
import { signUp } from "../network/user_api";
import { formError } from "../types/FormError";
import { unknownError } from "../errors/unknown_error";

export interface newUserDataBody {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpPage() {
  const newUserDataStateDefaultValue = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const [newUserData, setNewUserData] = useState<newUserDataBody>(
    newUserDataStateDefaultValue
  );

  const [error, setError] = useState<formError | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewUserData({
      ...newUserData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const validate = signUpFormSchema.safeParse({
        email: newUserData.email,
        username: newUserData.username,
        password: newUserData.password,
        confirmPassword: newUserData.confirmPassword,
      });

      if (!validate.success) {
        const errorDesc = validate.error.issues.map((issue) => issue.message);
        throw new ValidationError(errorDesc);
      }

      const createUserAPIResponse = await signUp({
        username: newUserData.username,
        password: newUserData.password,
        email: newUserData.email,
      });

      if (createUserAPIResponse.status == conflicErrorStatusCode) {
        throw new ConflictError(createUserAPIResponse.message);
      }

      const dataCreatedStatusCode = 201;

      if (createUserAPIResponse.status != dataCreatedStatusCode) {
        throw new ServerError();
      }

      setError(null);
      setNewUserData(newUserDataStateDefaultValue);
    } catch (err) {
      if (
        err instanceof ValidationError ||
        err instanceof ServerError ||
        err instanceof ConflictError
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
          title="Email"
          name="email"
          id="email"
          type="email"
          value={newUserData.email}
          onChange={handleChange}
          placeholder="Insert Your Account Email"
          additionalStyles="mb-3"
        />
        <LoginSignUpInputBox
          title="Username"
          name="username"
          id="username"
          type="text"
          value={newUserData.username}
          onChange={handleChange}
          placeholder="Insert Your Account Username"
          additionalStyles="mb-3"
        />

        <LoginSignUpInputBox
          title="Password"
          name="password"
          id="password"
          type="password"
          value={newUserData.password}
          onChange={handleChange}
          placeholder="Insert Your Account Password"
          additionalStyles="mb-3"
        />

        <LoginSignUpInputBox
          title="Confirm Password"
          name="confirmPassword"
          id="confirmPassword"
          type="password"
          value={newUserData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Your Password"
        />

        <div
          className={`w-full mt-10 flex justify-center ${
            loading ? "bg-blue-300" : "bg-blue-700"
          } text-white p-3 rounded-3xl font-semibold`}
        >
          <button type="submit" disabled={loading}>
            SignUp
          </button>
        </div>
      </form>
      <div className="flex justify-center mt-10">
        Already an User?
        <a
          href="/login"
          className="ml-1 text-blue-800 hover:text-black underline"
        >
          LOGIN
        </a>
      </div>
    </>
  );
}
