import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAddPostMutation, useGetAllPostsQuery } from '~/features/post/api';
import { createPost } from '~/features/post/post.schema';
import * as T from '~/features/post/types';

export const PostsPage = () => {
  const { data: posts } = useGetAllPostsQuery();
  const [addPost] = useAddPostMutation()

  const { handleSubmit, register, reset } = useForm({
    resolver: createPost,
  })

  const onSubmit = (data: T.NewPost) => {
    addPost(data);
    reset()
  }

  return (
    <Stack gap={2}>
      <Stack component='form' onSubmit={handleSubmit(onSubmit)} gap={1} marginTop={2} marginBottom={2}>
        <TextField label="Title" variant='outlined' {...register('title')} />
        <TextField label="Text" variant='outlined' multiline {...register('text')} />
        <Button type="submit">Add</Button>
      </Stack>
      {posts?.map(({ id, title, text }) => (
        <Box key={id}>
          <Stack>
            <Typography variant='caption' fontWeight={600}>Title:</Typography>
            <Typography>{title}</Typography>
            <Typography variant='caption' fontWeight={600}>Text:</Typography>
            <Typography>{text}</Typography>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};
