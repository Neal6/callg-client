import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { customRouteProps } from "../types/route";

const PrivateRoute = (props: customRouteProps) => {
  const isLogin = useSelector((state: any) => state.auth.isLogin);
  const { component: Component, force, ...rest } = props;

  return (
    <>
      {isLogin ? (
        <Route
          {...rest}
          render={(propsRoute: any) => {
            return (
              <Component
                {...propsRoute}
                key={force ? Date.now() : propsRoute.key}
              />
            );
          }}
        />
      ) : (
        <Redirect to={`${process.env.REACT_APP_ROUTE_LOGIN}`} />
      )}
    </>
  );
};

export default PrivateRoute;
