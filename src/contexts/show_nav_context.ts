import { createContext, useContext } from "react";

interface ShowNavContext {
  showNav: boolean;
  setShowNav: (showNav: boolean) => void;
}

export const ShowNavContext = createContext<ShowNavContext | undefined>(
  undefined
);

export function useShowNav() {
  const context = useContext(ShowNavContext);
  if (!context)
    throw new Error("useShowNav must be used within an ShowNavContextProvider");
  return context;
}
