import { Avatar, IconButton, Menu, MenuItem, Popover, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useState } from 'react';
import { useUserStore } from '~/shared/store/user';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { DialogType } from './types';
import { SignUp } from '~/features/user/sign_up';
import { Login } from '~/features/user/login';

export function Auth() {
  const { isAuth, user } = useUserStore();

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

  return (
    <>
      <div>
        {isAuth ? (
          <IconButton>
            <Typography>{user?.name}</Typography>
            <Avatar alt={user?.name || ''} src={user?.avatar || ''} />
          </IconButton>
        ) : (
          <IconButton aria-describedby={id} onClick={handleClick}>
            <Avatar sx={{ bgcolor: deepPurple[500] }}>
              <AccountCircleIcon />
            </Avatar>
          </IconButton>
        )}
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
            <MenuItem onClick={() => setDialogType('sign_up')}>Sign up</MenuItem>
          </Menu>
        )}
      </div>
      <SignUp isOpen={dialogType === 'sign_up'} onClose={() => setDialogType('closed')} />
      <Login isOpen={dialogType === 'login'} onClose={() => setDialogType('closed')} />
    </>
  );
}
