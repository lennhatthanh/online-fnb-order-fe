import { ClipboardList, LogOut, Package } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IconBurger } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

// Menu items.
const items = [
    {
        title: "Food Management",
        url: "/admin",
        icon: Package,
    },
    {
        title: "Order Management",
        url: "/admin/orders",
        icon: ClipboardList,
    },
];

export function AppSidebar() {
    const location = useLocation();
    const { logoutUser } = useContext(AuthContext);
    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };
    return (
        <Sidebar className="">
            <SidebarContent>
                <SidebarHeader className={"border-b p-4 flex flex-row"}>
                    <div className="w-10 h-10 bg-gray-200 flex justify-center items-center rounded-xl">
                        <IconBurger height={20} width={20} stroke={2} />
                    </div>
                    <div className="">
                        <h1 className="font-bold">FoodOrder</h1>
                        <p className="text-xs text-accent-foreground">Admin Panel</p>
                    </div>
                </SidebarHeader>
                <SidebarGroupContent className={"p-4"}>
                    <SidebarMenu className={"flex gap-2"}>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    className={`p-5 hover:bg-accent-foreground hover:text-white duration-200 transition-all ${
                                        location.pathname == item.url ? "bg-accent-foreground text-white" : ""
                                    }`}
                                >
                                    <Link to={item.url}>
                                        <item.icon className="w-5 h-5" />
                                        <span className="text-sm font-bold">{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarContent>
            <SidebarFooter className={"text-red-500 border-t "}>
                <button
                    onClick={handleLogout}
                    className="hover:bg-red-200 duration-200 py-2 px-4 flex flex-row items-center rounded-lg  font-bold text-sm gap-3 cursor-pointer"
                >
                    <LogOut className="w-5 h-5" />
                    <p>Log out</p>
                </button>
            </SidebarFooter>
        </Sidebar>
    );
}
