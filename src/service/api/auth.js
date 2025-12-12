import api from ".";

export const register = async (payload) => {
    return await api.post("", payload);
};

export const login = async (payload) => {
    return await api.post("/auth/login", payload);
};
export const getMe = async () => {
    return await api.get("/auth/me");
};
export const logout = async () => {
    return await api.post("/auth/logout");
};

export const refreshToken = async () => {
    return await api.post("/auth/refresh-token");
};

export const loginGoogle = async (payload) => {
    return await api.post("/auth/google-login", payload);
};
