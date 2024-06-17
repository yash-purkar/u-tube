// @ts-nocheck
import axios from "axios";

import { getCookie, setCookie } from "cookies-next";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_API_URL,
});

// context of request for server side rendering requests, for e.g from getServerSideprops fn
var context: any;

// It checks is request is made from server or from client.
const isServer = () => typeof window === "undefined";

// It return cookie value
// If request is made from server side pass the request and res otherwise simply get from the browser
const getCookieValue = (name: string) =>
  isServer()
    ? getCookie(name, { req: context.req, res: context.res })
    : getCookie(name);

const setCookieValue = (name: string, value: string) =>
  isServer()
    ? setCookie(name, value, { req: context.req, res: context.res })
    : setCookie(name, value);

// It will execute before request sent to backend
// Use call an api -> intercepter will run -> request will go to server
axiosInstance.interceptors.request.use(
  async (config: any) => {
    try {
      const token = getCookieValue("token");

      config.headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
    } catch (error) {
      console.log("Axios Request intercepter error", error);
    }
    return config;
  },
  (error) => {
    // Do anything with requst error
    return Promise.reject(error);
  }
);

export default axiosInstance;
