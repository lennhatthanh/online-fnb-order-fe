import { DialogLogin } from "@/components/DialogLogin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AuthContext from "@/context/AuthContext";
import { IconBrandGoogleFilled, IconBurger, IconUser } from "@tabler/icons-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
export default function Home() {
    const { loginUser, loginAdmin } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState(null);
    const handleLogin = async () => {
        try {
            await loginUser();
            toast.success("Đăng nhập thành công");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    const handleOpenDialog = () => {
        setOpen(true);
    };
    const handleLoginAdmin = async () => {
        try {
            const res = await loginAdmin(form);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    return (
        <div className="w-screen h-screen flex items-center">
            <Card className="w-full max-w-sm mx-auto">
                <CardHeader className="text-center">
                    <div className="w-15 h-15 bg-gray-200 flex justify-center items-center rounded-2xl mx-auto mb-5">
                        <IconBurger height={30} width={30} stroke={2} />
                    </div>
                    <CardTitle className="text-2xl font-bold">Food Order System</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Delicious meals delivered to your door
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <div className="flex flex-col gap-2">
                            <Button onClick={handleLogin} variant="outline" className="w-full py-5">
                                <IconBrandGoogleFilled stroke={2} />
                                Sign in with google
                            </Button>
                            <div className="relative py-5">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 bg-white p-2">
                                    OR
                                </div>
                                <div className="border-b border-border"></div>
                            </div>
                            <Button onClick={handleOpenDialog} className="w-full  py-5">
                                <IconUser stroke={2} />
                                Sign in as admin
                            </Button>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <CardDescription className="text-center text-[11px]">
                        By logging in, you agree to our <span className="underline">Terms of Service</span> and{" "}
                        <span className="underline">Privacy Policy</span>
                    </CardDescription>
                </CardFooter>
            </Card>
            <DialogLogin
                open={open}
                setOpen={setOpen}
                handleLoginAdmin={handleLoginAdmin}
                form={form}
                setForm={setForm}
            />
        </div>
    );
}
