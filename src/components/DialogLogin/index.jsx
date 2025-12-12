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

export function DialogLogin({ open, setOpen, handleLoginAdmin, form, setForm }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Login Admin</DialogTitle>
                    <DialogDescription className="text-center">
                        Sign in with your admin account to continue.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="email-1">Email</Label>
                        <Input
                            value={form?.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            id="email-1"
                            placeholder="@peduarte"
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="password-1">Password</Label>
                        <Input
                            value={form?.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            id="password-1"
                            type="password"
                            placeholder="Enter your password"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleLoginAdmin} type="submit">Login Admin</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
