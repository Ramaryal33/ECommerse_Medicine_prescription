import axios from 'axios';

const BASE_URL = 'https://localhost:7235/api/medicine';

export const GetMedicines = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const CreateMedicine = async (formData) => {
  await axios.post(BASE_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const UpdateMedicine = async (id, formData) => {
  await axios.put(`${BASE_URL}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const DeleteMedicine = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
