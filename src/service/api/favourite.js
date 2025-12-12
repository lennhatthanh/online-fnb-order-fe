import api from ".";
export const createFavourite = async (payload) => {
    return await api.post(`/favourite`, payload);
};

export const deleteFavourite = async (id) => {
    return await api.delete(`/favourite/${id}`);
};

export const getFavourite = async () => {
    return await api.get(`/favourite`);
};