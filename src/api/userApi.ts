import axios, { AxiosError } from "axios";
import type User from "../types/user";

const API_URL = "http://localhost:4000/users";

// Error handling helper
const handleApiError = (error: unknown, operation: string): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    console.error(`${operation} failed:`, axiosError.response?.data || axiosError.message);
    throw new Error(axiosError.response?.data as string || axiosError.message || `${operation} failed`);
  }
  console.error(`${operation} failed:`, error);
  throw new Error(`${operation} failed`);
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const res = await axios.get<User[]>(API_URL);
    return res.data;
  } catch (error) {
    return handleApiError(error, "Fetching users");
  }
};

export const createUser = async (user: User): Promise<User> => {
  try {
    // Remove id field if it exists for creation
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...userWithoutId } = user;
    const res = await axios.post<User>(API_URL, userWithoutId);
    return res.data;
  } catch (error) {
    return handleApiError(error, "Creating user");
  }
};

export const updateUser = async (id: number, user: User): Promise<User> => {
  try {
    if (!id || id <= 0) {
      throw new Error("Invalid user ID for update");
    }
    
    // Remove id from the user object to avoid conflicts
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _userId, ...userWithoutId } = user;
    const res = await axios.put<User>(`${API_URL}/${id}`, userWithoutId);
    return res.data;
  } catch (error) {
    return handleApiError(error, "Updating user");
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    if (!id || id <= 0) {
      throw new Error("Invalid user ID for deletion");
    }
    
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    handleApiError(error, "Deleting user");
  }
};
