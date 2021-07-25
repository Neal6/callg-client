import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { io } from "socket.io-client";

import RootRouter from "@routes/RootRouter";
import SplashPage from "@pages/SplashPage/SplashPage";
import * as actionApp from "@store/actions/appActions";
import * as socketAction from "@store/actions/socketAction";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const splashLoading = useSelector((state: any) => state.app.splashLoading);
  const redirectAuthUrl = useSelector(
    (state: any) => state.app.redirectAuthUrl
  );
  const isLogin = useSelector((state: any) => state.auth.isLogin);
  const userId = useSelector((state: any) => state.auth._id);
  useEffect(() => {
    if (isLogin) {
      if (/\/login|\/register/gi.test(redirectAuthUrl)) {
        history.push(`${process.env.REACT_APP_ROUTE_HOME}`);
      } else {
        history.push(redirectAuthUrl);
      }
      dispatch(actionApp.splashLoadingDone);
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
  }, [isLogin, redirectAuthUrl, history]);

  return <div>{splashLoading ? <SplashPage /> : <RootRouter />}</div>;
};

export default App;
