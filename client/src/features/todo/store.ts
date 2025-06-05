import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoItem } from './types';

export interface TodoState {
  newTodo: TodoItem,
  todos: TodoItem[]
}

const initialState: TodoState = {
  newTodo: {
    title: ''
  },
  todos: []
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<TodoItem[]>) {
      state.todos = action.payload
    },
    addTodo(state, action: PayloadAction<TodoItem>) {
      state.todos.push(action.payload)
    }
  }
})

export const { setTodos, addTodo } = todoSlice.actions
export default todoSlice.reducer