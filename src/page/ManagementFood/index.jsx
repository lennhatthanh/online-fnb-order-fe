import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { Fragment, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DialogFood } from "@/components/DialogFood";
import { createFood, deleteFood, getAllFood, updateFood } from "@/service/api/food";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";
const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
];

export default function Admin() {
    const [open, setOpen] = useState(false);
    const [foods, setFoods] = useState(null);
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isCreate, setIsCreate] = useState(true);
    const handleOpenDialog = (payload, iscreate) => {
        setForm(payload);
        console.log(payload);
        setIsCreate(iscreate);
        setOpen(true);
    };
    const fetchListMenu = async () => {
        const res = await getAllFood();
        setFoods(res.data.data.reverse());
    };
    const handleCreateFood = async () => {
        try {
            const res = await createFood(form);
            setFoods([res.data.data, ...foods]);
            toast.success(res.data.message);
            setOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            setIsCreate(false);
        }
    };
    const handleUpdateFood = async () => {
        try {
            const res = await updateFood(form._id, form);
            setFoods(foods.map((item) => (item._id === res.data.data._id ? res.data.data : item)));
            toast.success(res.data.message);
            setOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            setIsCreate(false);
        }
    };
    const handleDeleteFood = async (payload) => {
        try {
            const res = await deleteFood(payload._id);
            setFoods(foods.filter((item) => item._id !== res.data?.data?._id));
            toast.success(res.data.message);
            setOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };
    const handleUpdataIsAvailable = async (is_available, payload) => {
        try {
            const res = await updateFood(payload._id, {
                is_available,
            });
            setFoods(foods.map((item) => (item._id === res.data.data._id ? res.data.data : item)));
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };
    useEffect(() => {
        fetchListMenu();
        console.log(123);
    }, []);
    return (
        <Fragment>
            <div className="flex gap-6 justify-between">
                <h1 className="text-2xl font-bold">Management Food</h1>
                <Button onClick={() => handleOpenDialog(null, true)} variant={"outline"}>
                    <Plus /> Add New Food
                </Button>
            </div>
            <div className="border rounded-2xl mt-5 overflow-hidden">
                <div className="w-full overflow-x-auto">
                    <Table className={"w-full"}>
                        <TableHeader>
                            <TableRow>
                                <TableHead className={"text-center"}>ID</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead className={" max-w-sm  hidden lg:table-cell"}>Description</TableHead>
                                <TableHead>Available</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {foods?.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="text-accent-foreground text-center">{index + 1}</TableCell>
                                    <TableCell>
                                        <img src={item.image_url} alt="" className="w-12 h-12 rounded-lg" />
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell className={"text-red-500"}>${item.price}</TableCell>
                                    <TableCell className={"max-w-xs whitespace-nowrap truncate hidden lg:table-cell"}>
                                        {item.description}
                                    </TableCell>
                                    <TableCell>
                                        <Switch
                                            checked={item.is_available}
                                            onCheckedChange={(e) => handleUpdataIsAvailable(e, item)}
                                            id="airplane-mode"
                                        />
                                    </TableCell>
                                    <TableCell className={"flex gap-2 text-center justify-center"}>
                                        <Button onClick={() => handleOpenDialog(item, false)} variant={"outline"}>
                                            <Pencil />
                                        </Button>
                                        <Button onClick={(e) => handleDeleteFood(item)} variant={"outline"}>
                                            <Trash2 className="text-red-500" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <DialogFood
                open={open}
                setOpen={setOpen}
                handleCreateFood={handleCreateFood}
                handleUpdateFood={handleUpdateFood}
                form={form}
                setForm={setForm}
                isCreate={isCreate}
            />
        </Fragment>
    );
}
