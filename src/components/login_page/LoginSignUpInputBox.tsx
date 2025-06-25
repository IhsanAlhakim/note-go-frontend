interface LoginSignUpInputBoxProps {
  title: string;
  name: string;
  id: string;
  type: "text" | "password" | "email";
  placeholder: string;
  additionalStyles?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function LoginSignUpInputBox({
  name,
  title,
  id,
  type,
  placeholder,
  value,
  onChange,
  additionalStyles,
}: LoginSignUpInputBoxProps) {
  return (
    <>
      <p>{title}</p>
      <div
        className={`border-0 rounded-sm p-2 bg-slate-300 ${additionalStyles}`}
      >
        <input
          name={name}
          id={id}
          autoComplete="off"
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none placeholder-slate-700"
        />
      </div>
    </>
  );
}
