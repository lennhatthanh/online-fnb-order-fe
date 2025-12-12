import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutUser from "./components/LayoutUser";
import Menu from "./page/Menu";
import Orders from "./page/Orders";
import Home from "./page/Home";
import LayoutAdmin from "./components/LayoutAdmin";
import Admin from "./page/ManagementFood";
import AdminOrders from "./page/OrderAdmin";
import Cart from "./page/Cart";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectRoute from "./components/ProtectRoute";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    <Route index path="/login" element={<Home />} />
                    <Route
                        path="/"
                        element={
                            <ProtectRoute role={"user"}>
                                <LayoutUser />
                            </ProtectRoute>
                        }
                    >
                        <Route path="menu" element={<Menu />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="cart" element={<Cart />} />
                    </Route>
                    <Route
                        path="/admin"
                        element={
                            <ProtectRoute role={"admin"}>
                                <LayoutAdmin />
                            </ProtectRoute>
                        }
                    >
                        <Route index path="" element={<Admin />} />
                        <Route path="orders" element={<AdminOrders />} />
                    </Route>
                </Routes>
            </AuthContextProvider>
            <Toaster />
        </BrowserRouter>
    );
}

export default App;
