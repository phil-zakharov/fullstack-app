import { RootState } from '~/app/store';

export const selectTodos = (state: RootState) => state.todo.todos