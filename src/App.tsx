import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Paper,
  Divider,
  Alert,
  Snackbar,
} from "@mui/material";
import { People } from "@mui/icons-material";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import { getUsers, createUser, updateUser, deleteUser } from "./api/userApi";
import type User from "./types/user";

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch users",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (user: User) => {
    try {
      if (editingUser) {
        await updateUser(editingUser.id!, user);
        setSnackbar({
          open: true,
          message: "User updated successfully!",
          severity: "success",
        });
        setEditingUser(null);
      } else {
        await createUser(user);
        setSnackbar({
          open: true,
          message: "User created successfully!",
          severity: "success",
        });
      }
      fetchUsers();
    } catch {
      setSnackbar({
        open: true,
        message: "Operation failed. Please try again.",
        severity: "error",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      setSnackbar({
        open: true,
        message: "User deleted successfully!",
        severity: "success",
      });
      fetchUsers();
    } catch {
      setSnackbar({
        open: true,
        message: "Failed to delete user",
        severity: "error",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 0.98)",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            mb={4}
          >
            <People sx={{ fontSize: 40, color: "primary.main" }} />
            <Typography
              variant="h3"
              fontWeight="bold"
              color="primary"
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem", lg: "2rem" },
              }}
            >
              User Management System
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <UserForm
            onSubmit={handleSubmit}
            editingUser={editingUser}
            onCancel={handleCancelEdit}
          />

          <Divider sx={{ my: 4 }} />

          {loading ? (
            <Box display="flex" justifyContent="center" py={8}>
              <CircularProgress size={60} />
            </Box>
          ) : (
            <UserList
              users={users}
              onEdit={setEditingUser}
              onDelete={handleDelete}
            />
          )}
        </Paper>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
