import axios, { AxiosError } from "axios";
import type User from "../types/user";

const API_URL = "https://jsonplaceholder.typicode.com/users";
const STORAGE_KEY = "user_management_users";

// JSONPlaceholder user structure
interface JSONPlaceholderUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website?: string;
  address?: Record<string, unknown>;
  company?: Record<string, unknown>;
}

// Transform JSONPlaceholder user to our User type
const transformToUser = (jsonUser: JSONPlaceholderUser): User => {
  // Split name into firstName and lastName
  const nameParts = jsonUser.name.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return {
    id: jsonUser.id,
    firstName,
    lastName,
    phone: jsonUser.phone,
    email: jsonUser.email,
  };
};

// LocalStorage Helper Functions
const getLocalUsers = (): User[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return [];
  }
};

const saveLocalUsers = (users: User[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    throw new Error("Failed to save data to localStorage");
  }
};

const getNextId = (users: User[]): number => {
  if (users.length === 0) return 1;
  const maxId = Math.max(...users.map((u) => u.id || 0));
  return maxId + 1;
};

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
    // Check if we have users in localStorage
    let localUsers = getLocalUsers();
    
    // If no local users, fetch from JSONPlaceholder API (initial seed data)
    if (localUsers.length === 0) {
      const res = await axios.get<JSONPlaceholderUser[]>(API_URL);
      localUsers = res.data.map(transformToUser);
      // Save initial data to localStorage
      saveLocalUsers(localUsers);
    }
    
    return localUsers;
  } catch (error) {
    // If API fails, still return local users if available
    const localUsers = getLocalUsers();
    if (localUsers.length > 0) {
      return localUsers;
    }
    return handleApiError(error, "Fetching users");
  }
};

export const createUser = async (user: User): Promise<User> => {
  try {
    const localUsers = getLocalUsers();
    
    // Remove id field if it exists for creation
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...userWithoutId } = user;
    
    // Generate new ID
    const newId = getNextId(localUsers);
    const newUser: User = {
      ...userWithoutId,
      id: newId,
    };
    
    // Save to localStorage
    const updatedUsers = [newUser, ...localUsers];
    saveLocalUsers(updatedUsers);
    
    return newUser;
  } catch (error) {
    return handleApiError(error, "Creating user");
  }
};

export const updateUser = async (id: number, user: User): Promise<User> => {
  try {
    if (!id || id <= 0) {
      throw new Error("Invalid user ID for update");
    }
    
    const localUsers = getLocalUsers();
    
    // Find and update the user
    const userIndex = localUsers.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new Error("User not found");
    }
    
    // Remove id from the user object to avoid conflicts
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _userId, ...userWithoutId } = user;
    
    const updatedUser: User = {
      ...userWithoutId,
      id,
    };
    
    // Update in localStorage
    localUsers[userIndex] = updatedUser;
    saveLocalUsers(localUsers);
    
    return updatedUser;
  } catch (error) {
    return handleApiError(error, "Updating user");
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    if (!id || id <= 0) {
      throw new Error("Invalid user ID for deletion");
    }
    
    const localUsers = getLocalUsers();
    
    // Filter out the user to delete
    const updatedUsers = localUsers.filter((u) => u.id !== id);
    
    if (updatedUsers.length === localUsers.length) {
      throw new Error("User not found");
    }
    
    // Save to localStorage
    saveLocalUsers(updatedUsers);
  } catch (error) {
    handleApiError(error, "Deleting user");
  }
};

// Utility function to clear all users from localStorage (useful for testing)
export const clearAllUsers = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log("All users cleared from localStorage");
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};
