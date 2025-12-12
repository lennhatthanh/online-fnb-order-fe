import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import HeaderUser from "../HeaderUser";

export default function LayoutUser() {
    const location = useLocation();
    return (
        <div className="">
            <header className="z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0">
                <HeaderUser />
            </header>
            <main className="px-4 py-6 mx-auto container">
                <Outlet />
            </main>
        </div>
    );
}
