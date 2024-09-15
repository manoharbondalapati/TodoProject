import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../redux/TodoSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import '../App.css'
import { useNavigate } from 'react-router-dom';

const StyledTableContainer = styled(TableContainer)({
  marginTop: '20px',
});

const StyledTableHead = styled(TableHead)({
  backgroundColor: '#f5f5f5',
});

const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold',
  color: '#333',
});

const StyledTitle = styled(Typography)({
  margin: '20px 0',
  textAlign: 'center',
});

const Todos = () => {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const navigate=useNavigate();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handletodo= (id)=>
  {
         navigate(`/todo/${id}`);
  }

  return (
    <>
      <StyledTitle variant="h4">
        Todo List
      </StyledTitle>
      <StyledTableContainer component={Paper}>
        <Table>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Todo</StyledTableCell>
              <StyledTableCell>Completed</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {todos.map((todo) => (
              <TableRow
                key={todo.id}
                sx={{
                  '&:nth-of-type(odd)': {
                    backgroundColor: 'action.hover',
                  },
                }}
                onClick={()=>handletodo(todo.id)}
                className='hovering'
              >
                <TableCell>{todo.id}</TableCell>
                <TableCell>{todo.todo}</TableCell>
                <TableCell>
                  <Checkbox checked={todo.completed} disabled />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </>
  );
};

export default Todos;