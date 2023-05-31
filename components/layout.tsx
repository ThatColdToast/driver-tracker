import { PropsWithChildren } from "react";
import Navbar from "./navbar";

const Layout = ({ children }: PropsWithChildren) => {
    return (
      <>
        {children}
      </>
    );
  };
  export default Layout;