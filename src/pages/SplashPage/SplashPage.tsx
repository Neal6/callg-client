import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { io } from "socket.io-client";

import "@pages/SplashPage/splashPage.scss";
import * as actionApp from "@store/actions/appActions";
import * as actionAuth from "@store/actions/authActions";
import * as localStorage from "@utils/localStorage";
import * as socketAction from "@store/actions/socketAction";
import friendSocketListener from "@socket/friend";

const SplashPage = () => {
  const history = useHistory();
  const location = useLocation();
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
    dispatch(
      actionApp.redirectAuthUrl(`${location.pathname}${location.search}`)
    );
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
      if (/\/login|\/register/gi.test(redirectAuthUrl)) {
        history.push(`${process.env.REACT_APP_ROUTE_HOME}`);
      } else {
        history.push(redirectAuthUrl);
      }
      initApp();
    }
    // eslint-disable-next-line
  }, [isLogin]);

  const initApp = async () => {
    const socket = io(`${process.env.REACT_APP_SOCKET_URL}`, {
      withCredentials: true,
    });
    await new Promise((resolve) => {
      socket.on("connect", () => {
        dispatch(socketAction.socketConnect(socket));
        socket.emit("connect-login", { userId });
        resolve(null);
      });
    });
    friendSocketListener(socket, dispatch, useSelector);
    dispatch(actionApp.splashLoadingDone());
  };

  return <>{splashLoading && <div className="splash-page"></div>}</>;
};

export default SplashPage;
