import { Avatar, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { deepPurple, purple } from '@mui/material/colors';
import { useState } from 'react';
import { useUserSelector } from '~/shared/store/user';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { DialogType } from './types';
import { SignUp } from '~/features/user/sign_up';
import { Login } from '~/features/user/login';
import { useLazyLogoutQuery } from '~/features/user/api';

export function Auth() {
  const { isAuth, user } = useUserSelector();
  const [logout] = useLazyLogoutQuery();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [dialogType, setDialogType] = useState<DialogType>('closed');

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div>
        {isAuth ? (
          <>
            <IconButton onClick={openMenu}>
              <Typography sx={{ mr: 2, color: purple[50] }}>{user?.name}</Typography>
              <Avatar alt={user?.name || ''} src={user?.avatar || ''} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
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
              <MenuItem onClick={() => logout('')}>Log out</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <IconButton onClick={openMenu}>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
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
          </>
        )}
      </div>
      <SignUp isOpen={dialogType === 'sign_up'} onClose={() => setDialogType('closed')} />
      <Login isOpen={dialogType === 'login'} onClose={() => setDialogType('closed')} />
    </>
  );
}
