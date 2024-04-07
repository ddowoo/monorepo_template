import { ReactNode } from "react";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return <div className="container max-w-screen-sm h-dvh m-auto p-5">{children}</div>;
};

export default PageLayout;
