import { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Box,
  TableContainer,
  Chip,
  IconButton,
  Tooltip,
  TablePagination,
} from "@mui/material";
import {
  EditOutlined,
  DeleteOutlined,
  PersonOutline,
} from "@mui/icons-material";
import type User from "../types/user";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export default function UserList({ users, onEdit, onDelete }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate paginated users
  const paginatedUsers = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        mb={3}
        justifyContent="space-between"
      >
        <Typography
          variant="h6"
          fontWeight="600"
          color="primary"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <PersonOutline /> User Directory
        </Typography>
        <Chip
          label={`Total Users: ${users.length}`}
          color="primary"
          sx={{
            fontWeight: "600",
            fontSize: "0.9rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        />
      </Box>

      {users.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: "center",
            backgroundColor: "#f5f7ff",
            borderRadius: 2,
          }}
        >
          <PersonOutline sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No users found. Add your first user to get started!
          </Typography>
        </Paper>
      ) : (
        <TableContainer
          component={Paper}
          elevation={2}
          sx={{
            borderRadius: 2,
            overflow: "auto",
            border: "1px solid #e0e0e0",
            maxWidth: "100%",
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow
                sx={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
              >
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: "0.95rem",
                  }}
                >
                  First Name
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: "0.95rem",
                  }}
                >
                  Last Name
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: "0.95rem",
                  }}
                >
                  Phone
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: "0.95rem",
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: "0.95rem",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "#f8f9ff",
                    },
                    "&:hover": {
                      backgroundColor: "#e8ebff",
                      transition: "all 0.3s ease",
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: "500" }}>
                    {user.firstName}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "500" }}>
                    {user.lastName}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.phone}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                  </TableCell>
                  <TableCell sx={{ color: "text.secondary" }}>
                    {user.email}
                  </TableCell>
                  <TableCell align="center">
                    <Box display="flex" gap={1} justifyContent="center">
                      <Tooltip title="Edit User" arrow>
                        <IconButton
                          onClick={() => onEdit(user)}
                          size="small"
                          sx={{
                            color: "primary.main",
                            "&:hover": {
                              backgroundColor: "primary.light",
                              transform: "scale(1.1)",
                            },
                            transition: "all 0.2s ease",
                          }}
                        >
                          <EditOutlined />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete User" arrow>
                        <IconButton
                          onClick={() => onDelete(user.id!)}
                          size="small"
                          sx={{
                            color: "error.main",
                            "&:hover": {
                              backgroundColor: "error.light",
                              transform: "scale(1.1)",
                            },
                            transition: "all 0.2s ease",
                          }}
                        >
                          <DeleteOutlined />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              borderTop: "1px solid #e0e0e0",
              ".MuiTablePagination-toolbar": {
                backgroundColor: "#f8f9ff",
              },
            }}
          />
        </TableContainer>
      )}
    </Box>
  );
}