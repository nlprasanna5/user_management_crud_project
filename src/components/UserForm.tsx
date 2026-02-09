import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  InputAdornment,
} from "@mui/material";
import {
  PersonOutline,
  EmailOutlined,
  PhoneOutlined,
  SaveOutlined,
  CancelOutlined,
  PersonAddOutlined,
} from "@mui/icons-material";
import { userFormSchema } from "../config/formSchema";
import type User from "../types/user";

interface Props {
  onSubmit: (data: User) => void;
  editingUser?: User | null;
  onCancel?: () => void;
}

export default function UserForm({ onSubmit, editingUser, onCancel }: Props) {
  const [formData, setFormData] = useState<User>({} as User);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateFormData = () => {
      if (editingUser) {
        setFormData(editingUser);
      } else {
        setFormData({} as User);
      }
    };
    updateFormData();
  }, [editingUser]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    userFormSchema.forEach((field) => {
      const value = formData[field.name] || "";

      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
      }

      if (field.pattern && !field.pattern.test(value)) {
        newErrors[field.name] = field.errorMessage || "Invalid value";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: string, value: string) => {
    // Only allow numeric values for phone field
    if (name === "phone" && value !== "" && !/^\d*$/.test(value)) {
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(formData);
    setFormData({} as User);
    setErrors({});
  };

  const handleCancel = () => {
    setFormData({} as User);
    setErrors({});
    if (onCancel) onCancel();
  };

  const getIcon = (fieldName: string) => {
    switch (fieldName) {
      case "firstName":
      case "lastName":
        return <PersonOutline />;
      case "email":
        return <EmailOutlined />;
      case "phone":
        return <PhoneOutlined />;
      default:
        return null;
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        mb: 4,
        background: "linear-gradient(145deg, #f8f9ff 0%, #ffffff 100%)",
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h6"
        fontWeight="600"
        color="primary"
        mb={3}
        display="flex"
        alignItems="center"
        gap={1}
      >
        {editingUser ? (
          <>
            <SaveOutlined /> Edit User
          </>
        ) : (
          <>
            <PersonAddOutlined /> Add New User
          </>
        )}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 3,
        }}
      >
        {userFormSchema.map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            type={field.type}
            value={formData[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            error={!!errors[field.name]}
            helperText={errors[field.name]}
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {getIcon(field.name)}
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "primary.main",
                },
              },
            }}
          />
        ))}
      </Box>

      <Box display="flex" gap={2} mt={4} justifyContent="flex-end">
        {editingUser && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            startIcon={<CancelOutlined />}
            size="large"
          >
            Cancel
          </Button>
        )}
        <Button
          variant="contained"
          onClick={handleSubmit}
          startIcon={editingUser ? <SaveOutlined /> : <PersonAddOutlined />}
          size="large"
          sx={{
            px: 4,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
            },
          }}
        >
          {editingUser ? "Update User" : "Create User"}
        </Button>
      </Box>
    </Paper>
  );
}
