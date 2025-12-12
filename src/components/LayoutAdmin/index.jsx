import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../app-sidebar";
import { IconBurger } from "@tabler/icons-react";

export default function LayoutAdmin() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex flex-col w-screen">
                <div className={"border-b p-4 flex flex-row justify-between items-center z-51 bg-white md:hidden block"}>
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-10 h-10 bg-gray-200 flex justify-center items-center rounded-xl">
                            <IconBurger height={20} width={20} stroke={2} />
                        </div>
                        <h1 className="font-bold">FoodOrder</h1>
                    </div>
                    <SidebarTrigger />
                </div>
                <main className="px-4 py-6 mx-auto container">
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    );
}
