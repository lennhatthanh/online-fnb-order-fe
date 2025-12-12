import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getAllOrder } from "@/service/api/order";
const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    paid: "bg-blue-100 text-blue-800 border-blue-200",
    preparing: "bg-orange-100 text-orange-800 border-orange-200",
    shipping: "bg-purple-100 text-purple-800 border-purple-200",
    completed: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
};
const foods = [
    {
        name: "John Doe",
        email: "john@example.com",
        items: ["Classic Cheeseburger", "Fresh Lemonade"],
        total: "30.97",
        payment: "Bank",
        status: "preparing",
    },
    {
        name: "John Doe",
        email: "john@example.com",
        items: ["Classic Cheeseburger", "Fresh Lemonade"],
        total: "30.97",
        payment: "Bank",
        status: "pending",
    },
    {
        name: "John Doe",
        email: "john@example.com",
        items: ["Classic Cheeseburger", "Fresh Lemonade"],
        total: "30.97",
        payment: "Bank",
        status: "preparing",
    },
    {
        name: "John Doe",
        email: "john@example.com",
        items: ["Classic Cheeseburger", "Fresh Lemonade"],
        total: "30.97",
        payment: "Bank",
        status: "paid",
    },
    {
        name: "John Doe",
        email: "john@example.com",
        items: ["Classic Cheeseburger", "Fresh Lemonade"],
        total: "30.97",
        payment: "Bank",
        status: "cancelled",
    },
];
export default function AdminOrders() {
    const [orders, setOrders] = useState(null);
    const [status, setStatus] = useState(null);
    const fetchOrder = async () => {
        try {
            const res = await getAllOrder();
            setOrders(res.data.data);
        } catch (error) {
            console.log(error.response.data.message);
        }
    };
    useEffect(() => {
        fetchOrder();
    }, []);
    const handleChangeStatus = (payload, value) => {
        console.log(payload);
        console.log(value);
        setOrders(orders.map((item) => (item._id === payload._id ? { ...item, status: value } : item)));
    };
    const handleSaveStatus = (payload) => {
        const newOrer = orders.find(item => item._id === payload._id)
        console.log(newOrer);
        
    };
    return (
        <div className="flex flex-col gap-2 justify-between">
            <h1 className="text-2xl font-bold">Order Management</h1>
            <p>Manage and update customer orders</p>
            <div className="border rounded-2xl mt-5 overflow-hidden">
                <div className="w-full overflow-x-auto">
                    <Table className={"w-full"}>
                        <TableHeader>
                            <TableRow>
                                <TableHead className={"text-center"}>Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead className={" max-w-sm  hidden lg:table-cell"}>Payment</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders?.map((item, index) => (
                                <TableRow key={index} className={""}>
                                    <TableCell className="text-accent-foreground text-center">
                                        {"ORD-00" + (index + 1)}
                                    </TableCell>
                                    <TableCell>
                                        <Label>{item.user_id.name}</Label>
                                        <p className="text-xs text-accent-foreground">{item.user_id.email}</p>
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                        {item.items
                                            .map((value) => `${value.food_id.name} x${value.quantity}`)
                                            .join(", ")}
                                    </TableCell>
                                    <TableCell className={"text-red-500"}>${item.total_amount.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Badge className={"text-black bg-white border border-border"}>
                                            {item.payment_method}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className={"max-w-xs whitespace-nowrap truncate hidden lg:table-cell"}>
                                        <Select onValueChange={(e) => handleChangeStatus(item, e)} value={item.status}>
                                            <SelectTrigger className="w-[120px]">
                                                <SelectValue placeholder="Select a fruit" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.entries(statusStyles).map(([key, style]) => (
                                                    <SelectItem key={key} value={key}>
                                                        <Badge className={`${style}`}>
                                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                                        </Badge>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className={"flex gap-2 text-center justify-center"}>
                                        <Button onClick={() => handleSaveStatus(item)} variant={"outline"}>
                                            <Check /> Save
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
