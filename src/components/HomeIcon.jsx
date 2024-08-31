import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import AuthContext from "../context/auth_context";

const HomeIcon = ({ color = "white" }) => {
  const { user } = useContext(AuthContext);
  return (
    <Link to="/" className={`absolute ${user ? "left-20" : "left-6 "} top-8`}>
      <FaHome color={color} fontSize={36} />
    </Link>
  );
};

export default HomeIcon;
