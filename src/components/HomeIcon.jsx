import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";

const HomeIcon = ({ color = "white" }) => {
  const { user } = useSelector((state) => state.user);
  const { provider } = useSelector((state) => state.provider);
  return (
    <Link
      to="/"
      className={`absolute ${
        user || provider ? "left-20" : "left-6 "
      } top-8 z-10`}
    >
      <FaHome color={color} fontSize={36} />
    </Link>
  );
};

export default HomeIcon;
