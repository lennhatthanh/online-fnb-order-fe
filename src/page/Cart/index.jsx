import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ShoppingBag, Trash2 } from "lucide-react";
import React, { Fragment, useEffect, useState } from "react";
import { addCart, deleteCart, getCart } from "@/service/api/card";
import toast from "react-hot-toast";
import { createOrder } from "@/service/api/order";
import { Link } from "react-router-dom";
import formatTotalPrice from "@/utils/formatTotalPrice";

export default function Cart() {
    const [card, setCard] = useState(null);
    const [payment_method, setPayment_method] = useState("Banking");
    const [loading, setLoading] = useState(false);
    const fetchCard = async () => {
        try {
            const res = await getCart();
            setCard(res.data.data);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCard();
    }, []);
    const handleAddCard = async (payload) => {
        try {
            const res = await addCart({
                food_id: payload.food_id,
                quantity: "1",
                price: payload.price,
                name: payload.name,
            });
            setCard(res.data.data);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };
    const handletRemoveCard = async (payload) => {
        try {
            const res = await deleteCart({
                food_id: payload.food_id,
                quantity: "1",
                price: payload.price,
                name: payload.name,
            });
            setCard(res.data.data);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };
    const handleCeateOrder = async () => {
        try {
            const res = await createOrder({
                payment_method,
            });
            setCard(null);
        } catch (error) {}
    };
    return (
        <div className="flex flex-col gap-6">
            {loading ? (
                <>Loading</>
            ) : card ? (
                <Fragment>
                    <h1 className="text-2xl font-bold">Your Cart</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <div className="col-span-1 lg:col-span-2 flex flex-col gap-5">
                            {card?.items.map((item) => (
                                <Card className={"flex flex-row items-end justify-between px-5 py-8"}>
                                    <div className="flex items-center justify-center gap-5">
                                        <img
                                            src="https://fe-order-food.vercel.app/classic-cheeseburger.png"
                                            alt=""
                                            className="w-20 h-20 rounded-xl"
                                        />
                                        <div className="flex flex-col gap-1">
                                            <h1 className="font-bold">{item.name}</h1>
                                            <p className="text-lg text-red-500 font-bold">${item.price}</p>
                                            <div className="flex gap-3 items-center justify-start">
                                                <Button
                                                    onClick={() => handletRemoveCard(item)}
                                                    variant={"outline"}
                                                    className={"h-8 w-8"}
                                                >
                                                    -
                                                </Button>
                                                <p>{item.quantity}</p>
                                                <Button
                                                    onClick={() => handleAddCard(item)}
                                                    variant={"outline"}
                                                    className={"h-8 w-8"}
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant={"outline"} className={"border-none hover:bg-red-500"}>
                                        <Trash2 className="" />
                                    </Button>
                                </Card>
                            ))}
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className={"flex flex-col gap-1"}>
                                <div className="border-b pb-3">
                                    {card?.items?.map((item) => (
                                        <div className="flex items-center justify-between text-sm">
                                            <p className="text-muted-foreground">
                                                {item.name} x {item.quantity}
                                            </p>
                                            <p>${item.price}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between text-lg font-bold">
                                    <p className="">Total</p>
                                    <p className="text-red-500">{formatTotalPrice(card?.items)}</p>
                                </div>
                                <div className="flex flex-col gap-3 mt-5">
                                    <CardTitle className={"text-lg"}>Payment Methoad</CardTitle>
                                    <RadioGroup value={payment_method} onValueChange={(e) => setPayment_method(e)}>
                                        <label
                                            className="flex items-center gap-3 w-full border p-3 rounded-xl cursor-pointer"
                                            htmlFor="r1"
                                        >
                                            <RadioGroupItem value="Banking" id="r1" />
                                            <Label htmlFor="r1">Bank Transfer / Card</Label>
                                        </label>
                                        <label className="flex items-center gap-3 w-full border p-3 rounded-xl cursor-pointer">
                                            <RadioGroupItem value="Cash" id="r2" />
                                            <Label htmlFor="r2">Cash on Delivery</Label>
                                        </label>
                                    </RadioGroup>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleCeateOrder} className={"text-center py-5 w-full"}>
                                    Create Order
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </Fragment>
            ) : (
                <div className="flex flex-col items-center justify-center gap-5 mt-5">
                    <div className="bg-accent p-6 rounded-full">
                        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h1 className="text-2xl font-bold">Your cart is empty</h1>
                    <p className="text-muted-foreground max-w-md text-center">
                        Looks like you haven't added any items to your cart yet. Start exploring our delicious menu!
                    </p>{" "}
                    <Link to={"/menu"}>
                        <Button>Browse Menu</Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
