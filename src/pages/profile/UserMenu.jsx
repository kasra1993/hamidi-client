import React from "react";
import { useSelector } from "react-redux";
import ProviderMenu from "./ProviderMenu";
import RegularUserMenu from "./RegularUserMenu";
import { useLocation } from "react-router-dom";

const UserMenu = () => {
  const { user } = useSelector((state) => state.user);
  const { provider } = useSelector((state) => state.provider);
  const location = useLocation();
  const isBlackIconPage =
    location.pathname === "/parts" || location.pathname === "/materials";
  const isProfilePage =
    location.pathname === "/user-profile" ||
    location.pathname === "/provider-profile";

  if (user) {
    return (
      <RegularUserMenu
        user={user}
        isBlackIconPage={isBlackIconPage}
        isProfilePage={isProfilePage}
      />
    );
  }

  if (provider) {
    return (
      <ProviderMenu
        provider={provider}
        isBlackIconPage={isBlackIconPage}
        isProfilePage={isProfilePage}
      />
    );
  }

  return null;
};

export default UserMenu;
