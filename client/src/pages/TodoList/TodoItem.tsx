import { Checkbox, Stack, Typography } from '@mui/material';
import { useUpdateTodoMutation } from '~/features/todo/api';
import * as T from '~/features/todo/types';

type Props = T.TodoItem;

export const TodoItem = ({ id, title, completed }: Props) => {
  const [update] = useUpdateTodoMutation()

  const onChangeCompleted = (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    update({
      id, title, completed: checked
    })
  }

  return (
    <Stack
      direction="row"
      gap={2}
      alignItems="center"
      borderRadius={2}
      padding={1}
      justifyContent='space-between'
      sx={{ border: (t) => `1px solid ${t.palette.primary.main}` }}
    >
      <Typography color="secondary">{title}</Typography>
      <Checkbox value={completed} onChange={onChangeCompleted}/>
    </Stack>
  );
};
