import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { customRouteProps } from "../types/route";

const PrivateRoute = (props: customRouteProps) => {
  const isLogin = useSelector((state: any) => state.auth.isLogin);
  const { component: Component, ...rest } = props;

  return (
    <>
      {isLogin ? (
        <Route
          {...rest}
          render={(propsRoute) => {
            return <Component {...propsRoute} />;
          }}
        />
      ) : (
        <Redirect to={`${process.env.REACT_APP_ROUTE_LOGIN}`} />
      )}
    </>
  );
};

export default PrivateRoute;
