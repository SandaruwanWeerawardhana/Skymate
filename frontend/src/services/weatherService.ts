import axios from "axios";

export const getCities = async () => {
  const res = await axios.get("/api/cities");
  return res.data;
};

export const getWeather = async (cityId: string) => {
  const res = await axios.get(`/api/weather/${cityId}`);
  return res.data;
};
