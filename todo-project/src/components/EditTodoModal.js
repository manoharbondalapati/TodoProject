import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { updateTodo } from "../redux/TodoSlice";

const EditTodoModal = ({ open, onClose, todo, onUpdate }) => {
  const [todoText, setTodoText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (todo) {
      setTodoText(todo.todo || "");
    }
  }, [todo]);

  const handleUpdateTodo = () => {
    if (todo) {
      const updatedTodo = {
        id: todo.id,
        todo: todoText,
      };
      dispatch(updateTodo(updatedTodo.id, updatedTodo));
      onUpdate(updatedTodo);
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style, width: 400 }}>
        <Typography variant="h6" component="h2">
          Edit Todo
        </Typography>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <Button variant="contained" onClick={handleUpdateTodo}>
          Update Todo
        </Button>
      </Box>
    </Modal>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default EditTodoModal;
