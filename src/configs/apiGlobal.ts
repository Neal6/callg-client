//@ts-nocheck

import axios from "axios";

import * as localStorage from "@utils/localStorage";
import store from "@store/store";
import * as actionApp from "@store/actions/appActions";

const apiGlobal = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_API_URL}/api`,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

apiGlobal.interceptors.request.use(
  async (config) => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiGlobal.interceptors.response.use(
  async (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshRes = await axios({
          baseURL: `${process.env.REACT_APP_BASE_API_URL}/api`,
          timeout: 30000,
          headers: { "Content-Type": "application/json" },
          method: "post",
          url: "/auth/refreshToken",
          data: {
            refresh_token: localStorage.getItem("refresh_token"),
          },
        });

        if (refreshRes) {
          localStorage.setItem("access_token", refreshRes.data.access_token);
          localStorage.setItem("refresh_token", refreshRes.data.refresh_token);
        }
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${refreshRes.data.access_token}`;

        return apiGlobal(originalRequest);
      } catch (error) {
        console.log(error);
        localStorage.clear();
        store
          .getState()
          .app.history.replace(`${process.env.REACT_APP_ROUTE_LOGOUT}`);
        store.dispatch(actionApp.splashLoadingDone());
      }
    }
    if (error.response.status === 401) {
      localStorage.clear();
      store
        .getState()
        .app.history.replace(`${process.env.REACT_APP_ROUTE_LOGOUT}`);
      store.dispatch(actionApp.splashLoadingDone());
    }
    return Promise.reject(error);
  }
);

export default apiGlobal;
