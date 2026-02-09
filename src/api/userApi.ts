import axios from "axios";
import type User from "../types/user";




const API_URL = "http://localhost:4000/users";

export const getUsers = async () => {
  const res = await axios.get<User[]>(API_URL);
  return res.data;
};

export const createUser = async (user: User) => {
  const res = await axios.post(API_URL, user);
  return res.data;
};

export const updateUser = async (id: number, user: User) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _, ...userWithoutId } = user;
  const res = await axios.put(`${API_URL}/${id}`, userWithoutId);
  return res.data;
};

export const deleteUser = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
