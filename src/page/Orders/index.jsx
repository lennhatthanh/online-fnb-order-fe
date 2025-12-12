import DialogDetailsOrder from "@/components/DialogDetailsOrder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getFavourite } from "@/service/api/favourite";
import { getOrder } from "@/service/api/order";
import formatDate from "@/utils/formatDate";
import formatTotalPrice from "@/utils/formatTotalPrice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Orders() {
    const [open, setOpen] = useState(false);
    const [orders, setOrders] = useState(null);
    const [order, setOrder] = useState(null);
    const handleOpenDialog = (payload) => {
        setOpen(true);
        setOrder(payload);
    };
    const fetcMyOrder = async () => {
        try {
            const res = await getOrder();
            setOrders(res.data.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    useEffect(() => {
        fetcMyOrder();
    }, []);
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold">Order History</h1>
            <div className="flex flex-col gap-4">
                {orders?.map((item, index) => (
                    <Card className={"flex flex-col lg:flex-row lg:items-center justify-between px-6 py-10 lg:py-12"}>
                        <div>
                            <div className="flex gap-3">
                                <h4 className="font-medium">ORD-00{index + 1}</h4>
                                <Badge className={"bg-green-100 text-green-700 "}>{item.status}</Badge>
                            </div>
                            <p className="text-muted-foreground text-sm">{formatDate(item.updatedAt)}</p>
                            <p className="text-muted-foreground">
                                {item.items.length} item(s) • {item.payment_method}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-lg text-red-500 font-bold">{formatTotalPrice(item?.items)}</p>
                            <Button onClick={() => handleOpenDialog(item.items)}>View Details</Button>
                        </div>
                    </Card>
                ))}
            </div>
            <DialogDetailsOrder open={open} setOpen={setOpen} order={order}/>
        </div>
    );
}
