import api from "./api";

export const getProperties = async (filters = {}) => {
  const { data } = await api.get("/properties", {
    params: {
      minPrice: filters.minPrice || undefined,
      maxPrice: filters.maxPrice || undefined,
      bedrooms: filters.bedrooms || undefined,
      bathrooms: filters.bathroom || undefined
    }
  });
  return data;
};
