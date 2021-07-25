import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import "@pages/SplashPage/splashPage.scss";
import LogoIcon from "@assets/images/logos/logo-icon.png";
import * as actionApp from "@store/actions/appActions";
import * as actionAuth from "@store/actions/authActions";
import * as localStorage from "@utils/localStorage";

const SplashPage = () => {
  const dispatch = useDispatch();

  // init theme
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    document.body.classList.add(theme || "light");
  }, []);

  useEffect(() => {
    dispatch(actionApp.redirectAuthUrl(window.location.pathname));

    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      dispatch(actionApp.splashLoadingDone);
    } else {
      dispatch(actionAuth.loginWithToken());
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className="splash-page">
      <img src={LogoIcon} alt="" />
    </div>
  );
};

export default SplashPage;
