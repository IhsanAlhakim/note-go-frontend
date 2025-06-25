import { Outlet, useLocation } from "react-router";
import PagesContainer from "../components/note_page/PagesContainer";

export default function LoginSignupLayout() {
  const location = useLocation();
  return (
    <PagesContainer additionalStyles="flex justify-center items-center bg-gradient-to-t from-blue-900 via-blue-600 to-blue-400">
      <div className="w-[100px] h-[100px] absolute left-14 top-8">
        <h1 className="text-2xl font-bold text-blue-100">NoteNest</h1>
      </div>
      <div className="w-[350px] h-fit border-0 rounded-2xl pt-5 pb-4 px-5 bg-blue-100">
        <div className="mb-5">
          <h2 className="text-3xl font-bold text-slate-900">
            {location.pathname == "/login" ? "Login" : "Sign Up"}
          </h2>
        </div>
        <Outlet />
      </div>
    </PagesContainer>
  );
}
