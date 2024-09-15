import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./TodoSlice";

export const Store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});
