import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token
      }`;
  }
  return req;
});

export const login = (formData) => API.post("/api/user/login", formData);
export const signUp = (formData) => API.post("/api/user/signup", formData);
export const wagerRequest = (param) => API.post("/api/user/wager", param);
export const recentWagers = () => API.get("/api/user/recent-wagers");
export const getTokenAmount = () => API.get("/api/user/get-token-amount");
export const changePassword = (formData) =>
  API.post("/api/user/changePassword", formData);