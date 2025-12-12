import { auth, googleProvider } from "@/firebase";
import { getMe, login, loginGoogle, logout } from "@/service/api/auth";
import { signInWithPopup } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();
export function AuthContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo")) || null);
    const [role, setRole] = useState(userInfo?.user?.role || null);
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        setRole(userInfo?.user?.role || null);
    }, [userInfo]);
    const loginUser = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const idToken = await result.user.getIdToken();
            const res = await loginGoogle({ token: idToken });
            const newUser = { user: res.data.data.user, accessToken: res.data.data.accessToken };
            console.log(newUser);

            localStorage.setItem("userInfo", JSON.stringify(newUser));
            setUserInfo(newUser);
            res.data.data.user.role == "admin" ? navigate("/admin") : navigate("/menu");
        } catch (error) {
            console.log(error);

            toast.error(error?.response?.data?.message || "Đăng nhập thất bại");
        }
    };
    const loginAdmin = async (payload) => {
        try {
            const res = await login(payload);
            if (res.status === 200) {
                localStorage.setItem("userInfo", JSON.stringify({ accessToken: res.data.data.accessToken }));
                try {
                    const me = await getMe();
                    if (me.status === 200) {
                        setUserInfo({ user: me.data.data.user, accessToken: res.data.data.accessToken });
                        toast.success(res.data.data.messgae || "Login successfull");
                        navigate("/admin");
                    }
                } catch (error) {
                    toast.error(error?.response?.data?.message || "Đăng nhập thất bại");
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Đăng nhập thất bại");
        }
    };
    const logoutUser = async () => {
        try {
            const res = await logout();
            setUserInfo(null);
            localStorage.removeItem("userInfo");
            toast.success("Đăng xuất thành công");
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };
    return (
        <AuthContext.Provider value={{ userInfo, role, loginUser, loginAdmin, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
