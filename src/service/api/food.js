import api from ".";
export const getAllFood = async () => {
    return await api.get("/food");
};

export const createFood = async (payload) => {
    return await api.post("/food", payload);
};

export const updateFood = async (id, payload) => {
    return await api.put(`/food/${id}`, payload);
};

export const deleteFood = async (id) => {
    return await api.delete(`/food/${id}`);
};
