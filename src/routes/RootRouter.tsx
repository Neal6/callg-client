import React from "react";
import { Switch } from "react-router-dom";

import PublicRoute from "@routes/PublicRoute";
import PrivateRoute from "@routes/PrivateRoute";
const Logout = React.lazy(() => import("@pages/LogoutPage/LogoutPage"));
const Home = React.lazy(() => import("@pages/HomePage/Home"));
const Login = React.lazy(() => import("@pages/LoginPage/Login"));
const Register = React.lazy(() => import("@pages/RegisterPage/RegisterPage"));
const NotFoundPage = React.lazy(
  () => import("@pages/NotFoundPage/NotFoundPage")
);
const MePage = React.lazy(() => import("@pages/MePage/MePage"));
const MainLayout = React.lazy(() => import("@layouts/MainLayout"));

const RootRouter = () => {
  return (
    <Switch>
      <PrivateRoute
        path={`${process.env.REACT_APP_ROUTE_HOME}`}
        exact
        component={Home}
        layout={MainLayout}
      />
      <PrivateRoute
        path={`${process.env.REACT_APP_ROUTE_ME}`}
        exact
        component={MePage}
        layout={MainLayout}
      />
      <PrivateRoute
        path={`${process.env.REACT_APP_ROUTE_PROFILE}/:id`}
        exact
        component={Home}
        layout={MainLayout}
      />
      <PublicRoute
        path={`${process.env.REACT_APP_ROUTE_LOGIN}`}
        exact
        component={Login}
      />
      <PublicRoute
        path={`${process.env.REACT_APP_ROUTE_LOGOUT}`}
        exact
        component={Logout}
      />
      <PublicRoute
        path={`${process.env.REACT_APP_ROUTE_REGISTER}`}
        exact
        component={Register}
      />
      <PrivateRoute path={"*"} component={NotFoundPage} />
    </Switch>
  );
};

export default RootRouter;
