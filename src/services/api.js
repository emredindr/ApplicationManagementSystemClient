import axios from "axios";

export const login = async (input) => {
  const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/Auth/Login`, input);
  return data;
};

export const createApplication = async (input) => {
  const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/Application/CreateApplication`, input);
  return data;
};

export const getAllApplicationList = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/Application/GetApplicationList`, { headers: { Authorization: `Bearer ${localStorage.getItem("access-token")}` } });
  return data;
};

export const getApplicationById = async (id) => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/Application/GetApplicationById`, { params: { applicationId: id } });
  return data;
};

export const getApplicationStatusRatio = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/Application/GetApplicationStatusRatio`, { headers: { Authorization: `Bearer ${localStorage.getItem("access-token")}` } });
  return data;
};
export const updateApplicationStatus = async (input) => {
  const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/Application/UpdateApplicationStatus`, input, {
    headers: { Authorization: `Bearer ${localStorage.getItem("access-token")}` },
  });
  return data;
};

export const uploadDocuments = async (files) => {
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }

  const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/Document/UploadDocuments`, formData);
  return data;
};
