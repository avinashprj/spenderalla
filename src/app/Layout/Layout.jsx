import { Navbar } from "app/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <Outlet />
      <Navbar />
    </>
  );
};
