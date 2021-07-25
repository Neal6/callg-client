import axios from "axios";

import * as localStorage from "@utils/localStorage";

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
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshRes = await apiGlobal.post(`/auth/refreshToken`, {
          refresh_token: localStorage.getItem("refresh_token"),
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
        localStorage.clear();
        window.location.pathname = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiGlobal;
