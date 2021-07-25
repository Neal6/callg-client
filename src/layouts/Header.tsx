import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import "@layouts/header.scss";
import UserAvatarHeader from "@components/UserAvatarHeader/UserAvatarHeader";
import HeaderMenuApp from "@components/HeaderMenuApp/HeaderMenuApp";
import HeaderNotification from "@components/HeaderNotification/HeaderNotification";
import HeaderSearch from "@components/HeaderSearch/HeaderSearch";
import Logo from "@assets/images/logos/logo-no-text.png";

interface PropsType {}

const Header = (props: PropsType) => {
  return (
    <div className="header">
      <div className="header-left">
        <Link to="/" className="header-left__content">
          <img src={Logo} alt="" className="header-left__logo" />
        </Link>
      </div>
      <div className="header-right">
        <div>
          {/* <div className="header-breadcrumb-link">
            {breadcrumbLinks.map((link: string, index: number) => (
              <Fragment key={index}>
                <Link className="breadcrumb-link__item" to="/">
                  {link}
                </Link>
                {index !== breadcrumbLinks.length - 1 && (
                  <span className="breadcrumb-link__slpash">/</span>
                )}
              </Fragment>
            ))}
          </div> */}
          {/* <div className="header-page-name">Hoạt động gần đây</div> */}
        </div>
        <div className="header-right-content">
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
