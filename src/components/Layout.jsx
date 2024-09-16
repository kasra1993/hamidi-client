import React from "react";
import { Outlet } from "react-router-dom"; // Outlet will render the matched child route
import UserMenu from "../pages/profile/UserMenu";

const Layout = () => {
  return (
    <div>
      <header>
        <nav>
          {/* <LoginBtn /> */}
          <UserMenu />
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
