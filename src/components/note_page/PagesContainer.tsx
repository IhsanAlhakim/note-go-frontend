import { ReactNode } from "react";

interface PageContainerLayoutProps {
  children: ReactNode;
  additionalStyles?: string;
}

export default function PagesContainer({
  children,
  additionalStyles,
}: PageContainerLayoutProps) {
  return (
    <div className={`max-w-dvw min-h-dvh ${additionalStyles}`}>{children}</div>
  );
}
