import React from "react";
import mainLogo from "/main-logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className=" w-[10%] h-auto sticky top-10 float-right mr-10">
      <Link to="/">
        <img src={mainLogo} alt="logo" className="object-contain h-[200px]" />
      </Link>
    </div>
  );
};

export default Navbar;
