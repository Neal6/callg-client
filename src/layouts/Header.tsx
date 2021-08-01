import React from "react";

import "@layouts/header.scss";
import UserAvatarHeader from "@components/UserAvatarHeader/UserAvatarHeader";
import HeaderMenuApp from "@components/HeaderMenuApp/HeaderMenuApp";
import HeaderNotification from "@components/HeaderNotification/HeaderNotification";
import HeaderSearch from "@components/HeaderSearch/HeaderSearch";

interface PropsType {}

const Header = (props: PropsType) => {
  return (
    <div className="header">
      <div className="header-wrap">
        <div className="header-left"></div>
        <div className="header-right">
          <UserAvatarHeader />
          <HeaderNotification />
          <HeaderMenuApp />
          <HeaderSearch />
        </div>
      </div>
    </div>
  );
};

export default Header;
