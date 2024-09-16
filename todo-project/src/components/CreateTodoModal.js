import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { createTodo } from "../redux/TodoSlice";

const CreateTodoModal = ({ open, onClose }) => {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  const handleCreateTodo = () => {
    dispatch(
      createTodo({
        todo,
      })
    );
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style, width: 400 }}>
        <Typography variant="h6" component="h2">
          Create New Todo
        </Typography>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <Button variant="contained" onClick={handleCreateTodo}>
          Create Todo
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

export default CreateTodoModal;
