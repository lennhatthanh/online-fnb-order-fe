import AuthContext from "@/context/AuthContext";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectRoute({ children, role: ProtectRole }) {
    const { role, userInfo } = useContext(AuthContext);
    console.log(role);
    console.log(ProtectRole);
    if (!userInfo) {
        return <Navigate to="/login" />;
    }

    if (!ProtectRole.includes(role)) {
        return <Navigate to="/login" />;
    }
    return children;
}
