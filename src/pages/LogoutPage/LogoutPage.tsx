import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as localStorage from "@utils/localStorage";
import { logout } from "@store/actions/authActions";

const LogoutPage = () => {
  const dispatch = useDispatch();

  useEffect(
    () => {
      localStorage.clear();
      dispatch(logout());
    },
    // eslint-disable-next-line
    []
  );

  return <div></div>;
};

export default LogoutPage;
