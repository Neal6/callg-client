import React from "react";
import { Route } from "react-router-dom";

import { customRouteProps } from "../types/route";

const PublicRoute = (props: customRouteProps) => {
  const { component: Component, ...rest } = props;
  return (
    <Route {...rest} render={(propsRoute) => <Component {...propsRoute} />} />
  );
};

export default PublicRoute;
