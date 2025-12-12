import axios from "axios";
import toast from "react-hot-toast";
import { refreshToken } from "./auth";
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const parseUserInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = parseUserInfo?.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (originalRequest._retry) {
            return Promise.reject(error);
        }
        if (window.location.href.includes("/login")) {
            return Promise.reject(error);
        }

        if (error.response?.status == 401) {
            try {
                originalRequest._retry = true;
                const user = JSON.parse(localStorage.getItem("userInfo"));
                const res = await refreshToken();

                localStorage.setItem(
                    "userInfo",
                    JSON.stringify({ user: { ...user.user }, accessToken: res.data.data.accessToken })
                );
                return api(originalRequest);
            } catch (error) {
                toast.error(error.response?.data.message);
                localStorage.removeItem("userInfo");
            }
        }
    }
);
export default api;
