import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
    fetchTodoSuccess: (state, action) => {
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
  },
});

export const fetchTodos = () => async (dispatch) => {
  dispatch(fetchTodoStart());
  try {
    const response = await axios.get("https://dummyjson.com/todos");
    dispatch(fetchTodoSuccess(response.data.todos));
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


export  const { fetchTodoStart, fetchTodoSuccess, fetchTodoFailure,fetchSingleTodoSuccess } =
  TodoSlice.actions;

  export default TodoSlice.reducer;