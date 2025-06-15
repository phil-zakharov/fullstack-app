import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Auth } from '../Auth';
import { Stack } from '@mui/material';
import { Link } from '~/shared/ui/link';

export function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Stack direction="row" flexGrow={1} gap={2}>
            <Link to="/">Main</Link>
            <Link to="/todo">Todos</Link>
          </Stack>
          <div>
            <Auth />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
