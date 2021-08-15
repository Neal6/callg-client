import React from "react";
import { Switch } from "react-router-dom";

import PublicRoute from "@routes/PublicRoute";
import PrivateRoute from "@routes/PrivateRoute";
import Logout from "@pages/LogoutPage/LogoutPage";
import Home from "@pages/HomePage/Home";
import Login from "@pages/LoginPage/Login";
import Register from "@pages/RegisterPage/RegisterPage";
import NotFoundPage from "@pages/NotFoundPage/NotFoundPage";
import MePage from "@pages/MePage/MePage";
import MainLayout from "@layouts/MainLayout";
import ProfilePage from "@pages/ProfilePage/ProfilePage";
import FriendPage from "@pages/FriendPage/FriendPage";

const RootRouter = () => {
  return (
    <Switch>
      <PublicRoute
        path={`${process.env.REACT_APP_ROUTE_LOGIN}`}
        exact
        force
        component={Login}
      />

      <PublicRoute
        path={`${process.env.REACT_APP_ROUTE_REGISTER}`}
        exact
        component={Register}
      />
      <MainLayout>
        <Switch>
          <PrivateRoute
            path={`${process.env.REACT_APP_ROUTE_LOGOUT}`}
            exact
            component={Logout}
          />
          <PrivateRoute
            path={`${process.env.REACT_APP_ROUTE_HOME}`}
            exact
            component={Home}
          />
          <PrivateRoute
            path={`${process.env.REACT_APP_ROUTE_ME}`}
            exact
            component={MePage}
          />
          <PrivateRoute
            path={`${process.env.REACT_APP_ROUTE_PROFILE}/:id`}
            exact
            force
            component={ProfilePage}
          />
          <PrivateRoute
            path={`${process.env.REACT_APP_ROUTE_FRIEND}`}
            component={FriendPage}
          />
          <PrivateRoute path={"*"} component={NotFoundPage} />
        </Switch>
      </MainLayout>
    </Switch>
  );
};

export default RootRouter;
