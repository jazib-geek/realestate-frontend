import api from "./api";

export const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    if (data.token) {
        localStorage.setItem("token", data.token);
    }
    return data;
};

export const register = async (email, password) => {
    try {
        const { data } = await api.post("/auth/register", { email, password });
        if (data.token) {
            localStorage.setItem("token", data.token);
        }
        return data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || "Registration failed");
        }
        throw new Error("Registration failed");
    }
};

export const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
};

export const isLoggedIn = () => !!localStorage.getItem("token");
