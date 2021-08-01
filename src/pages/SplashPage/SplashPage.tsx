import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { io } from "socket.io-client";

import "@pages/SplashPage/splashPage.scss";
import * as actionApp from "@store/actions/appActions";
import * as actionAuth from "@store/actions/authActions";
import * as localStorage from "@utils/localStorage";
import * as socketAction from "@store/actions/socketAction";

const SplashPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const redirectAuthUrl = useSelector(
    (state: any) => state.app.redirectAuthUrl
  );
  const isLogin = useSelector((state: any) => state.auth.isLogin);
  const userId = useSelector((state: any) => state.auth._id);
  const splashLoading = useSelector((state: any) => state.app.splashLoading);
  const [showSplash, setShowSplash] = useState<boolean>(true);

  // init theme
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    document.body.classList.add(theme || "light");
  }, []);

  useEffect(() => {
    dispatch(actionApp.redirectAuthUrl(window.location.pathname));
    dispatch(actionApp.initHistoryRouter(history));

    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      dispatch(actionApp.splashLoadingDone());
    } else {
      dispatch(actionAuth.loginWithToken());
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isLogin) {
      dispatch(actionApp.splashLoadingDone());
      if (/\/login|\/register/gi.test(redirectAuthUrl)) {
        history.push(`${process.env.REACT_APP_ROUTE_HOME}`);
      } else {
        history.push(redirectAuthUrl);
      }

      const socket = io(`${process.env.REACT_APP_SOCKET_URL}`, {
        withCredentials: true,
      });
      socket.on("connect", () => {
        dispatch(
          socketAction.socketConnect({
            socket,
            socketId: socket.id,
            userId,
          })
        );
      });
    }
    // eslint-disable-next-line
  }, [isLogin]);

  return <>{splashLoading && <div className="splash-page"></div>}</>;
};

export default SplashPage;
