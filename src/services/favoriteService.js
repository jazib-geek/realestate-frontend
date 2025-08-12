import api from "./api";

export const getFavorites = async () => {
  const { data } = await api.get("/favorites");
  console.log("Fetched favorites:", data);
  return data;  
};

export const addFavorite = async (propertyId) => {
  const { data } = await api.post(`/favorites/${propertyId}`);
  return data;
};

export const removeFavorite = async (propertyId) => {
  const { data } = await api.delete(`/favorites/${propertyId}`);
  return data;
};
