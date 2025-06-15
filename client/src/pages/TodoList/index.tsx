import { Button, Container, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useCreateTodoMutation, useLazyGetTodosQuery } from '~/features/todo/api';
import { selectTodos } from '~/features/todo/selectors';
import { createTodoSch } from '~/features/todo/todo.schema';
import * as T from '~/features/todo/types';
import { TodoItem } from './TodoItem';

export const TodoListPage = () => {
  const [getTodos] = useLazyGetTodosQuery();
  const [createTodo] = useCreateTodoMutation();

  const todos = useSelector(selectTodos);

  const { handleSubmit, register, reset } = useForm({
    resolver: createTodoSch,
  });

  const onSubmit = (data: T.TodoItem) => {
    createTodo(data);
    reset();
  };

  return (
    <Container maxWidth="sm">
      <Stack component="form" onSubmit={handleSubmit(onSubmit)} sx={{ my: 3 }} gap={1}>
        <TextField label="Title" variant="outlined" {...register('title')} />
        <Button type="submit">Add</Button>
      </Stack>
      <Button onClick={() => getTodos(null)}>get all</Button>
      <Stack gap={2} sx={{ mt: 2 }}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </Stack>
    </Container>
  );
};
