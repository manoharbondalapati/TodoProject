import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleTodo } from '../redux/TodoSlice';
import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';

const TodoDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const todo = useSelector((state) => state.todos.todo);
  const loading = useSelector((state) => state.todos.loading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(fetchSingleTodo(id));
  }, [id, dispatch]);

//   if (loading) {
//     return <CircularProgress />;
//   }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box mt={5} display="flex" justifyContent="center">
      <Card sx={{ minWidth: 300, maxWidth: 500 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Todo Detail
          </Typography>
          <Typography sx={{ mt: 2, mb: 2 }} color="text.secondary">
            ID: {todo?.id}
          </Typography>
          <Typography variant="body2">
            Todo: {todo?.todo}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Completed: {todo?.completed ? 'Yes' : 'No'}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TodoDetails;
