import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import {
  useAddFriendMutation,
  useDeleteFriendMutation,
  useLazyFriendsQuery,
  useUsersQuery,
} from '~/features/user/api';
import { useUserSelector } from '~/shared/store/user';
import CachedIcon from '@mui/icons-material/Cached';

export const UsersPage = () => {
  const { data } = useUsersQuery();
  const [addFriend] = useAddFriendMutation();
  const [deleteFriend] = useDeleteFriendMutation();
  const [getFriends, { data: friends }] = useLazyFriendsQuery();

  const { user } = useUserSelector();

  const fetchFriends = useCallback(() => {
    if (user?.email) {
      getFriends({ email: user.email });
    }
  }, [getFriends, user?.email]);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  return (
    <Box>
      <Typography variant="h2">
        My Friends
        <IconButton onClick={fetchFriends} sx={{ ml: 1 }}>
          <CachedIcon />
        </IconButton>
      </Typography>
      <Stack gap={1}>
        {friends?.map(({ id, name, email }) => (
          <Box key={id}>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body1">{email}</Typography>
            <Button onClick={() => deleteFriend({ email })}>Delete friend</Button>
            <Divider sx={{ mt: 1 }} />
          </Box>
        ))}
      </Stack>
      <Typography variant="h2">Users</Typography>
      <Stack gap={1}>
        {data?.map(({ id, name, email }) => (
          <Box key={id}>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body1">{email}</Typography>
            <Button onClick={() => addFriend({ email })}>Add friend</Button>
            <Divider sx={{ mt: 1 }} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
