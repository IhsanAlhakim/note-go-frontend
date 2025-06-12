import { createContext, useContext } from "react";
import { User } from "../App";

interface UserContext {
  loggedInUser: User | null;
  setLoggedInUser: (user: User) => void;
}

export const UserContext = createContext<UserContext | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUser must be used within an UserContextProvider");
  return context;
}
