import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoItem } from './types';

export interface TodoState {
  newTodo: TodoItem;
  todos: TodoItem[];
}

const initialState: TodoState = {
  newTodo: {
    id: 0,
    title: '',
    completed: false,
  },
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<TodoItem[]>) {
      state.todos = action.payload;
    },
    addTodo(state, action: PayloadAction<TodoItem>) {
      state.todos.push(action.payload);
    },
    updateTodo(state, action: PayloadAction<TodoItem>) {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.id)

      state.todos.splice(index, 1, action.payload)
    }
  },
});

export const { setTodos, addTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
