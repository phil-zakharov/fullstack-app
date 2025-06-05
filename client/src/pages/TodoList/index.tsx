import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useCreateTodoMutation, useLazyGetTodosQuery } from '~/features/todo/api';
import { selectTodos } from '~/features/todo/selectors';
import { createTodoSch } from '~/features/todo/todo.schema';
import { TodoItem } from '~/features/todo/types';

export const TodoListPage = () => {
  const [getTodos] = useLazyGetTodosQuery();
  const [createTodo] = useCreateTodoMutation()

  const todos = useSelector(selectTodos);

  const { handleSubmit, register, reset } = useForm({
    resolver: createTodoSch,
  });

  const onSubmit = (data: TodoItem) => {
    createTodo(data)
    reset()
  }

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ m: 3 }}>
        <TextField label="Title" variant="outlined" {...register('title')} />
        <Button type="submit">Add</Button>
      </Box>
      <Button onClick={() => getTodos(null)}>get all</Button>
      <Stack>
        {todos.map((todo) => (
          <Box key={todo.title}>
            <Typography>{todo.title}</Typography>
          </Box>
        ))}
      </Stack>
    </Container>
  );
};
