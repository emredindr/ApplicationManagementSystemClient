import axios from "axios";

export const fetchLogin = async (input) => {
  const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/Auth/Login`, input);
  return data;
};
