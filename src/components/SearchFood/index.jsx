import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
export default function SearchFood({ search, setSearch }) {
    return (
        <div className="flex flex-col gap-4">
            <div className="relative">
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={"ps-9 max-w-md"}
                    placeholder="Search for food..."
                />
                <Search className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-muted-foreground" />
            </div>
            <ul className="flex gap-3 flex-wrap">
                <li className="border rounded-2xl px-3 py-1 font-medium text-sm hover:bg-accent cursor-pointer bg-accent">
                    All
                </li>
                <li className="border rounded-2xl px-3 py-1 font-medium text-sm hover:bg-accent cursor-pointer">
                    Burgers
                </li>
                <li className="border rounded-2xl px-3 py-1 font-medium text-sm hover:bg-accent cursor-pointer">
                    Pizza
                </li>
                <li className="border rounded-2xl px-3 py-1 font-medium text-sm hover:bg-accent cursor-pointer">
                    Sushi
                </li>
                <li className="border rounded-2xl px-3 py-1 font-medium text-sm hover:bg-accent cursor-pointer">
                    Salads
                </li>
                <li className="border rounded-2xl px-3 py-1 font-medium text-sm hover:bg-accent cursor-pointer">
                    Desserts
                </li>
                <li className="border rounded-2xl px-3 py-1 font-medium text-sm hover:bg-accent cursor-pointer">
                    Drinks
                </li>
            </ul>
        </div>
    );
}
