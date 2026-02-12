import axios, { type InternalAxiosRequestConfig } from "axios";

export const TOKEN_CYBERSOFT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MCIsIkhldEhhblN0cmluZyI6IjI5LzA1LzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc4MDAxMjgwMDAwMCIsIm5iZiI6MTc1MzAzMDgwMCwiZXhwIjoxNzgwMTYwNDAwfQ.KkGRtLpEsgoM4M_TapjOZIzvAwbay3QvXIwwN8XUqWk"

const api = axios.create({
    baseURL: "https://fiverrnew.cybersoft.edu.vn/api/",
});

api.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
    if (typeof window !== "undefined") {
        const userAdmin = localStorage.getItem("USER_ADMIN");
        const userLogin = localStorage.getItem("USER_LOGIN");

        const adminData = userAdmin ? JSON.parse(userAdmin) : null;
        const adminToken = adminData?.token || adminData?.accessToken || adminData?.content?.token || adminData?.content?.accessToken || "";

        const loginData = userLogin ? JSON.parse(userLogin) : null;
        const loginToken = loginData?.token || loginData?.accessToken || loginData?.content?.token || loginData?.content?.accessToken || "";

        if (adminToken || loginToken) {
            config.headers["token"] = adminToken || loginToken;
        }
    }
    config.headers["tokenCybersoft"] = TOKEN_CYBERSOFT;
    return config;
});

export default api
