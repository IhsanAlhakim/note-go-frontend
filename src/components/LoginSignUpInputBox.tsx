interface LoginSignUpInputBoxProps {
  title: string;
  name: string;
  id: string;
  type: "text" | "password" | "email";
  placeholder: string;
  additionalStyles?: string;
}

export default function LoginSignUpInputBox({
  name,
  title,
  id,
  type,
  placeholder,
  additionalStyles,
}: LoginSignUpInputBoxProps) {
  return (
    <>
      <p>{title}</p>
      <div className={`border-2 rounded-sm p-2 ${additionalStyles}`}>
        <input
          name={name}
          id={id}
          autoComplete="off"
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
        />
      </div>
    </>
  );
}
