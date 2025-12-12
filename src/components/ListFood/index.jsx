import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Heart, PlusIcon } from "lucide-react";
import { createFavourite } from "@/service/api/favourite";

export default function ListFood({ foods, handleAddCard, search, handleAddFavourite, removeAddFavourite, favourite }) {
    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {foods
                ?.filter((key) => key?.name?.toLowerCase().includes(search.toLowerCase()))
                .map((item) => (
                    <Card className={"border-none hover:shadow-lg duration-300 transition-all justify-between"}>
                        <div className="overflow-hidden aspect-[4/3] relative group">
                            <img
                                className={`w-full h-full object-fit  group-hover:scale-110 duration-300 object-cover `}
                                src={item.image_url}
                                alt=""
                            />
                            {item.is_available === false ? (
                                <div class="absolute inset-0 bg-background/80 flex items-center justify-center">
                                    <span class="text-muted-foreground font-medium">Unavailable</span>
                                </div>
                            ) : (
                                ""
                            )}

                            <button
                                onClick={() =>
                                    favourite.filter((fv) => fv.food_id === item._id).length > 0
                                        ? removeAddFavourite(favourite.find((fv) => fv.food_id === item._id))
                                        : handleAddFavourite(item)
                                }
                                className="rounded-lg bg-white hover:bg-accent absolute right-2 top-2 p-2 duration-200"
                            >
                                <Heart
                                    className={`w-4 h-4 ${
                                        favourite.filter((fv) => fv.food_id === item._id).length > 0
                                            ? "fill-current text-red-500"
                                            : ""
                                    }`}
                                />
                            </button>
                        </div>
                        <CardContent className={"px-4 flex flex-col gap-3"}>
                            <div className="flex items-center justify-between">
                                <CardTitle className={"text-lg"}>{item.name}</CardTitle>
                                <p className="font-bold text-red-500">${item.price}</p>
                            </div>
                            <CardDescription>{item.description}</CardDescription>
                            <CardFooter className={"px-4"}>
                                <Button
                                    onClick={() => handleAddCard(item)}
                                    variant="outline"
                                    className={"w-full"}
                                    disabled={item.is_available === false ? true : false}
                                >
                                    <PlusIcon /> Add to Cart
                                </Button>
                            </CardFooter>
                        </CardContent>
                    </Card>
                ))}
        </div>
    );
}
