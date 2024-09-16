import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { message } from "antd";

const initialState = {
  todos: [],
  todo: null,
  loading: false,
  error: null,
};

const TodoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    fetchTodoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTodosSuccess: (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    },
    fetchTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSingleTodoSuccess: (state, action) => {
      state.todo = action.payload;
    },
    createTodoSuccess: (state, action) => {
      state.todos.push(action.payload);
    },
    updateTodoSuccess: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    deleteTodoSuccess: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const fetchTodos = () => async (dispatch) => {
  dispatch(fetchTodoStart());
  try {
    const response = await axios.get("https://dummyjson.com/todos");
    dispatch(fetchTodosSuccess(response.data.todos));
  } catch (error) {
    dispatch(fetchTodoFailure(error.message));
  }
};

export const fetchSingleTodo = (id) => async (dispatch) => {
  dispatch(fetchTodoStart());
  try {
    const response = await axios.get(`https://dummyjson.com/todos/${id}`);
    dispatch(fetchSingleTodoSuccess(response.data));
  } catch (error) {
    dispatch(fetchTodoFailure(error.message));
  }
};

export const createTodo = (newTodo) => (dispatch, getState) => {
  const { todos } = getState().todos;
  const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
  newTodo.id = newId;
  dispatch(createTodoSuccess(newTodo));
  message.success("new todo created successfully");
};

export const updateTodo = (id, updatedTodo) => (dispatch) => {
  dispatch(updateTodoSuccess({ ...updatedTodo, id }));
  message.success("update todo successfully");
};

export const deleteTodo = (id) => (dispatch) => {
  dispatch(deleteTodoSuccess(id));
  message.success("deleted todo successfully");
};

export const {
  fetchTodoStart,
  fetchTodosSuccess,
  fetchTodoFailure,
  fetchSingleTodoSuccess,
  createTodoSuccess,
  updateTodoSuccess,
  deleteTodoSuccess,
} = TodoSlice.actions;

export default TodoSlice.reducer;
