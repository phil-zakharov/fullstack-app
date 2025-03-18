import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  TextField,
  Typography,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useState } from 'react';
import { useUserStore } from '~/shared/store/user';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useForm } from 'react-hook-form';
import { useCreateUserMutation } from '~/shared/api/user';

type DialogType = 'sign_in' | 'login' | 'closed';

type Form = {
  name: string;
  email: string;
  password: string;
};

export function Login() {
  const { isAuth, avatarUrl, name } = useUserStore();

  const [createUser] = useCreateUserMutation()

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [dialogType, setDialogType] = useState<DialogType>('closed');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const onSubmit = (form: Form) => {
    console.log(form);
    createUser(form)
  };

  const { register, handleSubmit } = useForm<Form>({});

  return (
    <>
      <div>
        <IconButton aria-describedby={id} onClick={handleClick}>
          {isAuth ? (
            <Avatar alt={name || ''} src={avatarUrl || ''} />
          ) : (
            <Avatar sx={{ bgcolor: deepPurple[500] }}>
              <AccountCircleIcon />
            </Avatar>
          )}
        </IconButton>
        {isAuth ? (
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
          </Popover>
        ) : (
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => setDialogType('login')}>Log in</MenuItem>
            <MenuItem onClick={() => setDialogType('sign_in')}>Sign up</MenuItem>
          </Menu>
        )}
      </div>
      <Dialog open={dialogType === 'sign_in'} onClose={() => setDialogType('closed')}>
        <DialogTitle>Sign up</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 1 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField variant="outlined" label="name" {...register('name')} />
            <TextField variant="outlined" label="email" {...register('email')} />
            <TextField
              variant="outlined"
              label="password"
              type="password"
              {...register('password')}
            />
            <Button type="submit">Submit</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
