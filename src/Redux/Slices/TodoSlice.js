import { createSlice } from "@reduxjs/toolkit";
import { getTodos, newtodo, updateTodo } from "../Functions/TodoFunc";

const todoslice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    errors: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(newtodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(newtodo.rejected, (state, action) => {
        state.errors = action.payload;
        state.loading = false;
        console.log(state.errors);
      })
      .addCase(newtodo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.errors = action.payload;
        state.loading = false;
        console.log(state.errors);
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.msg.split("/")[0] === "success") {
          const newTodos = action.payload.todos;

          state.todos = [...state.todos, ...newTodos];
        } else {
          state.errors = action.payload.msg.split("/")[1];
          console.log(state.errors);
        }
      })
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.errors = action;
        state.loading = false;
        console.log(action);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
      });
  },
});

export default todoslice.reducer;
