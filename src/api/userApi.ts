import type User from "../types/user";

const STORAGE_KEY = "users_data";

// Helper function to get users from localStorage
const getLocalUsers = (): User[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Helper function to save users to localStorage
const setLocalUsers = (users: User[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

// Helper function to generate unique ID
const generateId = (): number => {
  const users = getLocalUsers();
  if (users.length === 0) return 1;
  const maxId = Math.max(...users.map(u => Number(u.id) || 0));
  return maxId + 1;
};

export const getUsers = async (): Promise<User[]> => {
  // Simulate async behavior to match API pattern
  return Promise.resolve(getLocalUsers());
};

export const createUser = async (user: User): Promise<User> => {
  const users = getLocalUsers();
  const newUser = { ...user, id: generateId() };
  users.push(newUser);
  setLocalUsers(users);
  // Simulate async behavior
  return Promise.resolve(newUser);
};

export const updateUser = async (id: number, user: User): Promise<User> => {
  const users = getLocalUsers();
  const index = users.findIndex(u => Number(u.id) === Number(id));
  
  if (index === -1) {
    throw new Error('User not found');
  }
  
  const updatedUser = { ...user, id };
  users[index] = updatedUser;
  setLocalUsers(users);
  // Simulate async behavior
  return Promise.resolve(updatedUser);
};

export const deleteUser = async (id: number): Promise<void> => {
  const users = getLocalUsers();
  const filteredUsers = users.filter(u => Number(u.id) !== Number(id));
  setLocalUsers(filteredUsers);
  // Simulate async behavior
  return Promise.resolve();
};
