import { Outlet, useLocation } from "react-router";
import PagesContainer from "../components/note_page/PagesContainer";

export default function LoginSignupLayout() {
  const location = useLocation();
  return (
    <PagesContainer additionalStyles="flex justify-center items-center">
      <div className="w-[100px] h-[100px] absolute left-14 top-8">
        <h1 className="text-2xl">NoteNest</h1>
      </div>
      <div className="w-[350px] h-fit border-2 rounded-md pt-5 pb-4 px-5">
        <div className="mb-5">
          <h2 className="text-3xl font-semibold">
            {location.pathname == "/login" ? "Login" : "SignUp"}
          </h2>
        </div>
        <Outlet />
      </div>
    </PagesContainer>
  );
}
