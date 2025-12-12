import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";

export function DialogFood({ open, setOpen, handleCreateFood, handleUpdateFood, form, setForm, isCreate }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{isCreate ? "Add New Food" : "Update Food"}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="name-1">Name</Label>
                        <Input
                            value={form?.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            id="name-1"
                            placeholder="Food name"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="description-1">Description</Label>
                        <Textarea
                            value={form?.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            id="description-1"
                            placeholder="@peduarte"
                        />
                    </div>
                    <div className="flex gap-3">
                        <div className="flex-1 grid gap-3">
                            <Label htmlFor="price-1">Price($)</Label>
                            <Input
                                value={form?.price}
                                onChange={(e) => setForm({ ...form, price: e.target.value })}
                                type="number"
                                id="price-1"
                                placeholder="0.00"
                            />
                        </div>
                        <div className="flex-1 grid gap-3">
                            <Label htmlFor="category-1">Category</Label>
                            <Input
                                value={form?.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                id="category-1"
                                placeholder="Category"
                            />
                        </div>
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="image-1">Image URL</Label>
                        <Input
                            value={form?.image_url}
                            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                            id="image-1"
                            placeholder="https://... (optional)"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={form?.is_available === undefined ? true : form?.is_available}
                            onCheckedChange={(e) => setForm({ ...form, is_available: e })}
                            id="terms"
                        />
                        <Label htmlFor="terms">Available for order</Label>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={isCreate ? handleCreateFood : handleUpdateFood} type="submit">
                        {isCreate ? "Add Food" : "Update Food"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
