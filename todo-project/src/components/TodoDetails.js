import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleTodo } from "../redux/TodoSlice";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";

const TodoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todos.todo);
  const error = useSelector((state) => state.todos.error);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        await dispatch(fetchSingleTodo(id));
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    fetchTodo();
  }, [id, dispatch]);

  const handleBackClick = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <Box mt={5} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <>
      <Box mt={5} display="flex" justifyContent="center">
        <Button variant="contained" onClick={handleBackClick}>
          Back to Todos
        </Button>
      </Box>
      <Box mt={5} display="flex" justifyContent="center">
        <Card sx={{ minWidth: 300, maxWidth: 500 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Todo Detail
            </Typography>
            <Typography sx={{ mt: 2, mb: 2 }} color="text.secondary">
              ID: {todo?.id}
            </Typography>
            <Typography variant="body2">Todo: {todo?.todo}</Typography>
            <Typography sx={{ mt: 2 }}>
              Completed: {todo?.completed ? "Yes" : "No"}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default TodoDetails;
