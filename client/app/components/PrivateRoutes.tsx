import React, { useContext, type FC, type ReactNode } from "react";
import { redirect } from "react-router";
import { GlobaleContext } from "~/context/GlobalContext";

const PrivateRoutes: FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useContext(GlobaleContext);
  if (!user) {
    redirect("/");
  }
  return <div>{children}</div>;
};

export default PrivateRoutes;
