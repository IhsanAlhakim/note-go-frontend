import LoginSignUpInputBox from "../components/LoginSignUpInputBox";

export default function LoginPage() {
  return (
    <>
      <LoginSignUpInputBox
        title="Username"
        name="username"
        id="username"
        type="text"
        placeholder="Insert Your Account Username"
        additionalStyles="mb-5"
      />

      <LoginSignUpInputBox
        title="Password"
        name="password"
        id="password"
        type="password"
        placeholder="Insert Your Account Password"
      />

      <div className="w-full mt-10 flex justify-center bg-blue-700 text-white p-3 rounded-3xl font-semibold">
        <button>Login</button>
      </div>
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
