import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import * as localStorage from "@utils/localStorage";
import { logout } from "@store/actions/authActions";

const LogoutPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    localStorage.clear();
    dispatch(logout());
    history.push(`${process.env.REACT_APP_ROUTE_LOGIN}`);
  }, [dispatch, history]);

  return <div></div>;
};

export default LogoutPage;
