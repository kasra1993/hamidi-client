import React from "react";
import { useSelector } from "react-redux";
import ProviderMenu from "./ProviderMenu";
import RegularUserMenu from "./RegularUserMenu";

const UserMenu = () => {
  const { user } = useSelector((state) => state.user);
  const { provider } = useSelector((state) => state.provider);

  if (user) {
    return <RegularUserMenu user={user} />;
  }

  if (provider) {
    return <ProviderMenu provider={provider} />;
  }

  return null;
};

export default UserMenu;
