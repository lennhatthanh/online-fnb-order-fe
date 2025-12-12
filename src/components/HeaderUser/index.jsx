import { IconBurger, IconFileInvoice, IconGardenCart } from "@tabler/icons-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    DropdownMenuTrigger,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Label } from "../ui/label";
import { LogOut } from "lucide-react";
import AuthContext from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function HeaderUser() {
    const { userInfo, logoutUser } = useContext(AuthContext);
    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };
    return (
        <div className="container px-4 flex h-16 mx-auto justify-between items-center border-b">
            <Link to={"/menu"} className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-gray-200 flex justify-center items-center rounded-xl">
                    <IconBurger height={20} width={20} stroke={2} />
                </div>
                <p className="text-lg font-bold">Food Order</p>
            </Link>
            <div className="flex items-center justify-center gap-3">
                <Link to={"/orders"}>
                    <Button variant="outline">
                        <IconFileInvoice stroke={2} />
                        <p className="hidden lg:block">My Orders</p>
                    </Button>
                </Link>
                <Link to={"/cart"}>
                    <Button variant="outline">
                        <IconGardenCart stroke={2} />
                    </Button>
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar className={"cursor-pointer"}>
                            <AvatarImage
                                src={userInfo?.user?.avatar ? userInfo?.user?.avatar : "https://github.com/shadcn.png"}
                                alt="@shadcn"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <div className="flex items-center gap-2 p-2">
                            <Avatar>
                                <AvatarImage
                                    src={
                                        userInfo?.user?.avatar
                                            ? userInfo?.user?.avatar
                                            : "https://github.com/shadcn.png"
                                    }
                                    alt="@shadcn"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col justify-center">
                                <Label>{userInfo?.user?.name}</Label>
                                <p className="text-[12px] text-gray-500 break-all">{userInfo?.user?.email}</p>
                            </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className={"cursor-pointer h-10"}>
                            <Button
                                onClick={handleLogout}
                                className="w-full border-none text-start shadow-none"
                                variant="outline"
                            >
                                <LogOut />
                                <Label className={"cursor-pointer"}>Log out</Label>
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
