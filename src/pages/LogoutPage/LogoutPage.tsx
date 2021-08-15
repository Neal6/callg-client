import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import * as localStorage from "@utils/localStorage";
import { logout } from "@store/actions/authActions";
import * as socketService from "@services/socketService";

const LogoutPage = () => {
  const dispatch = useDispatch();

  useEffect(
    () => {
      toast.dismiss();
      socketService.connectLogout();
      localStorage.clear();
      dispatch(logout());
    },
    // eslint-disable-next-line
    []
  );

  return <div></div>;
};

export default LogoutPage;
