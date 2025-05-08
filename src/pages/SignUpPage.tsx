import LoginSignUpInputBox from "../components/LoginSignUpInputBox";

export default function SignUpPage() {
  return (
    <>
      <LoginSignUpInputBox
        title="Email"
        name="email"
        id="email"
        type="email"
        placeholder="Insert Your Account Email"
        additionalStyles="mb-3"
      />
      <LoginSignUpInputBox
        title="Username"
        name="username"
        id="username"
        type="text"
        placeholder="Insert Your Account Username"
        additionalStyles="mb-3"
      />

      <LoginSignUpInputBox
        title="Password"
        name="password"
        id="password"
        type="password"
        placeholder="Insert Your Account Password"
        additionalStyles="mb-3"
      />

      <LoginSignUpInputBox
        title="Confirm Password"
        name="confirmPassword"
        id="confirmPassword"
        type="password"
        placeholder="Confirm Your Password"
      />

      <div className="w-full mt-10 flex justify-center bg-blue-700 text-white p-3 rounded-3xl font-semibold">
        <button>SignUp</button>
      </div>
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
