import api from ".";
export const getCart = async () => {
    return await api.get(`/cart`);
};

export const addCart = async (payload) => {
    return await api.post(`/cart/add`, payload);
};

export const deleteCart = async (payload) => {
    return await api.post(`/cart/remove`, payload);
};
