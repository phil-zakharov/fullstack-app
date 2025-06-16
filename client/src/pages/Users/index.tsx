import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useAddFriendMutation, useLazyFriendsQuery, useUsersQuery } from '~/features/user/api';
import { useUserStore } from '~/shared/store/user';

export const Users = () => {
  const { data } = useUsersQuery();
  const [addFriend] = useAddFriendMutation();
  const [getFriends, { data: friends }] = useLazyFriendsQuery();

  const { user } = useUserStore();

  const handleAdd = async (email: string) => {
    console.log(' email:', email);
    try {
      const resp = await addFriend({ email });
      console.log(' resp:', resp);
    } catch (error) {
      console.log(' error:', error);
    }
  };

  useEffect(() => {
    if (user?.email) {
      getFriends({ email: user.email });
    }
  }, [getFriends, user?.email]);

  return (
    <Box>
      <Typography variant="h2">My Friends</Typography>
      <Stack gap={1}>
        {friends?.map(({ id, name, email }) => (
          <Box key={id}>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body1">{email}</Typography>
            <Button onClick={() => handleAdd(email)}>Add friend</Button>
            <Divider />
          </Box>
        ))}
      </Stack>
      <Typography variant="h2">Users</Typography>
      <Stack gap={1}>
        {data?.map(({ id, name, email }) => (
          <Box key={id}>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body1">{email}</Typography>
            <Button onClick={() => handleAdd(email)}>Add friend</Button>
            <Divider />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
