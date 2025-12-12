import api from ".";
export const createOrder = async (payload) => {
    return await api.post("/order", payload);
};

export const updateOrder = async (id, payload) => {
    return await api.put(`/order/:${id}`, payload);
};

export const getAllOrder = async () => {
    return await api.get(`/order/all`);
};

export const getOrder = async () => {
    return await api.get(`/order`);
};
