import ListFood from "@/components/ListFood";
import SearchFood from "@/components/SearchFood";
import { addCart } from "@/service/api/card";
import { createFavourite, deleteFavourite, getFavourite } from "@/service/api/favourite";
import { getAllFood } from "@/service/api/food";
import { useEffect, useState } from "react";
import { data } from "react-router-dom";

export default function Menu() {
    const [foods, setFoods] = useState(null);
    const [favourite, setFavourite] = useState(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const fetchListMenu = async () => {
        const res = await getAllFood();
        const resfv = await getFavourite();
        setFavourite(resfv.data.data);
        setFoods(res.data.data);
    };
    const handleAddCard = async (payload) => {
        const res = await addCart({ food_id: payload._id, quantity: "1", price: payload.price, name: payload.name });
        console.log(res);
    };
    useEffect(() => {
        fetchListMenu();
        console.log(123);
    }, []);
    const handleAddFavourite = async (payload) => {
        try {
            const res = await createFavourite(payload);
            setFavourite([...favourite, res.data.data]);
        } catch (error) {}
    };
    const removeAddFavourite = async (payload) => {
        try {
            const res = await deleteFavourite(payload._id);
            setFavourite(favourite.filter((item) => item._id !== res.data.data._id));
        } catch (error) {}
    };
    return (
        <div className="flex flex-col gap-10">
            <SearchFood search={search} setSearch={setSearch} />
            <ListFood
                foods={foods}
                handleAddCard={handleAddCard}
                search={search}
                handleAddFavourite={handleAddFavourite}
                removeAddFavourite={removeAddFavourite}
                favourite={favourite}
            />
        </div>
    );
}
