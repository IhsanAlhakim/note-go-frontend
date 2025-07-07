import { CircleUser, Menu, X } from "lucide-react";
import { useState } from "react";
import { useShowNav } from "../../contexts/show_nav_context";
import { useUser } from "../../contexts/user_context";
import DeleteUserButton from "./DeleteUserButton";
import LogoutButton from "./LogoutButton";
import SearchNoteInput from "./SearchNoteInput";

export default function NotePageHeader() {
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  const { loggedInUser } = useUser();
  const { setShowNav } = useShowNav();

  return (
    <header className="h-[60px] flex justify-center">
      <div className="flex h-full w-full">
        <div className="hidden lg:flex items-center w-[275px] text-2xl justify-center bg-blue-900 text-white">
          <h1 className="font-semibold">NoteNest</h1>
        </div>
        <div className="flex lg:hidden grow justify-center items-center">
          <button
            className="p-2 hover:bg-blue-600 rounded-xl hover:text-white transition-all"
            onClick={() => setShowNav(true)}
          >
            <Menu />
          </button>
        </div>
        <div className="flex items-center w-[250px] md:w-[600px] lg:w-[700px] lg:ml-10">
          <SearchNoteInput />
        </div>
        <div className="flex relative lg:hidden grow justify-center items-center">
          <button
            className={`p-2 hover:bg-blue-600 rounded-xl hover:text-white transition-all ${
              showLogoutButton && "bg-blue-600 text-white"
            }`}
            onClick={() => setShowLogoutButton(!showLogoutButton)}
          >
            {showLogoutButton ? <X /> : <CircleUser />}
          </button>
          {showLogoutButton && (
            <div
              className={`fixed grid grid-rows-[auto_40px_40px] bg-blue-600 top-15 right-4 w-[150px] text-white rounded-lg overflow-hidden`}
            >
              <div className="border-b-2 bg-blue-900 flex justify-center items-center font-bold gap-2 max-w-[150px] flex-col p-4">
                <CircleUser size={30} />
                <p className="text-center line-clamp-2">
                  {loggedInUser?.username}
                </p>
              </div>
              <DeleteUserButton />
              <LogoutButton />
            </div>
          )}
        </div>
        <div className="hidden grow lg:flex justify-end items-center pr-10 relative gap-5">
          <div className="flex flex-row justify-center items-center gap-2 font-semibold text-md">
            <CircleUser />
            <p className="max-w-[120px] line-clamp-1">
              {loggedInUser?.username}
            </p>
          </div>
          <button
            className={`p-2 hover:bg-blue-600 rounded-xl hover:text-white transition-all ${
              showLogoutButton && "bg-blue-600 text-white"
            }`}
            onClick={() => setShowLogoutButton(!showLogoutButton)}
          >
            {showLogoutButton ? <X /> : <Menu />}
          </button>
          {showLogoutButton && (
            <div
              className={`absolute grid grid-row-2 bg-blue-600 -bottom-20 w-[150px] h-[80px] text-white rounded-lg overflow-hidden`}
            >
              <DeleteUserButton />
              <LogoutButton />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
