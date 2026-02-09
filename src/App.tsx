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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
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
  const [deleteConfirmDialog, setDeleteConfirmDialog] = useState<{
    open: boolean;
    userId: number | null;
  }>({
    open: false,
    userId: null,
  });
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
    setLoading(true);
    try {
      if (editingUser && editingUser.id) {
        // Update existing user - check for duplicates excluding current user
        const duplicateEmail = users.find(
          (u) => u.email === user.email && u.id !== editingUser.id
        );
        const duplicatePhone = users.find(
          (u) => u.phone === user.phone && u.id !== editingUser.id
        );

        if (duplicateEmail) {
          setSnackbar({
            open: true,
            message: "Email already exists. Please use a different email.",
            severity: "error",
          });
          setLoading(false);
          return;
        }

        if (duplicatePhone) {
          setSnackbar({
            open: true,
            message: "Phone number already exists. Please use a different phone number.",
            severity: "error",
          });
          setLoading(false);
          return;
        }

        await updateUser(editingUser.id, user);
        setSnackbar({
          open: true,
          message: "User updated successfully!",
          severity: "success",
        });
        setEditingUser(null);
      } else {
        // Create new user - check for duplicates
        const duplicateEmail = users.find((u) => u.email === user.email);
        const duplicatePhone = users.find((u) => u.phone === user.phone);

        if (duplicateEmail) {
          setSnackbar({
            open: true,
            message: "Email already exists. Please use a different email.",
            severity: "error",
          });
          setLoading(false);
          return;
        }

        if (duplicatePhone) {
          setSnackbar({
            open: true,
            message: "Phone number already exists. Please use a different phone number.",
            severity: "error",
          });
          setLoading(false);
          return;
        }

        await createUser(user);
        setSnackbar({
          open: true,
          message: "User created successfully!",
          severity: "success",
        });
      }
      await fetchUsers();
    } catch (error) {
      console.error("Operation failed:", error);
      setSnackbar({
        open: true,
        message: editingUser
          ? "Failed to update user. Please try again."
          : "Failed to create user. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!id) {
      console.error("Invalid user ID");
      return;
    }
    
    // Show confirmation dialog
    setDeleteConfirmDialog({
      open: true,
      userId: id,
    });
  };

  const confirmDelete = async () => {
    const { userId } = deleteConfirmDialog;
    
    if (!userId) return;
    
    setDeleteConfirmDialog({ open: false, userId: null });
    setLoading(true);
    
    try {
      await deleteUser(userId);
      setSnackbar({
        open: true,
        message: "User deleted successfully!",
        severity: "success",
      });
      
      // If we're editing the user that's being deleted, cancel edit mode
      if (editingUser && editingUser.id === userId) {
        setEditingUser(null);
      }
      
      await fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
      setSnackbar({
        open: true,
        message: "Failed to delete user. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmDialog({ open: false, userId: null });
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmDialog.open}
        onClose={cancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title" sx={{ color: "error.main", fontWeight: 600 }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={cancelDelete} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} variant="contained" color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
