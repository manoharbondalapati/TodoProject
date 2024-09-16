import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  deleteTodo,
  createTodo,
  updateTodo,
} from "../redux/TodoSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import CreateTodoModal from "./CreateTodoModal";
import EditTodoModal from "./EditTodoModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledTableContainer = styled(TableContainer)({
  marginTop: "20px",
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: "#f5f5f5",
});

const StyledTableCell = styled(TableCell)({
  fontWeight: "bold",
  color: "#333",
});

const StyledTitle = styled(Typography)({
  margin: "20px 0",
  textAlign: "center",
});

const Todos = () => {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleCreateTodo = (newTodo) => {
    setCreateModalOpen(false);
    dispatch(createTodo(newTodo));
  };

  const handleEditTodo = (todo) => {
    setCurrentTodo(todo);
    setEditModalOpen(true);
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleViewTodo = (id) => {
    navigate(`/todo/${id}`);
  };

  const handleUpdateTodo = (updatedTodo) => {
    dispatch(updateTodo(updatedTodo.id, updatedTodo));
    setEditModalOpen(false);
  };

  return (
    <>
      <StyledTitle variant="h4">Todo List</StyledTitle>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setCreateModalOpen(true)}
      >
        Create Todo
      </Button>
      <StyledTableContainer component={Paper}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Todo</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {todos.map((todo) => (
              <TableRow
                key={todo.id}
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: "action.hover" },
                }}
                className="hovering"
              >
                <TableCell onClick={() => handleViewTodo(todo.id)}>
                  {todo.id}
                </TableCell>
                <TableCell onClick={() => handleViewTodo(todo.id)}>
                  {todo.todo}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditTodo(todo)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteTodo(todo.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <CreateTodoModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateTodo}
      />
      <EditTodoModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        todo={currentTodo}
        onUpdate={handleUpdateTodo}
      />
    </>
  );
};

export default Todos;
