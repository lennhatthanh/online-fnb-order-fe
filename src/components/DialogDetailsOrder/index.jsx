import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import formatTotalPrice from "@/utils/formatTotalPrice";

export default function DialogDetailsOrder({ open, setOpen, order }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Order ORD-001</DialogTitle>
                </DialogHeader>
                {order?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between border-b py-2">
                        <p className="font-medium">
                            {item.food_id.name} <span className="text-muted-foreground">x {item.quantity}</span>
                        </p>
                        <p>${item.price * item.quantity}</p>
                    </div>
                ))}
                <div className="flex items-center justify-between text-lg font-bold">
                    <p className="">Total</p>
                    <p className="text-red-500">{formatTotalPrice(order)}</p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
