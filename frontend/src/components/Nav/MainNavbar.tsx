'use client'
import * as React from 'react';
import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useColorScheme } from '@mui/material/styles';
import { deepOrange } from '@mui/material/colors';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { logout, profil } from '@/utils/api';

const pages = ['Все сервисы', 'Мои сервисы'];

interface UserFromAPI {
  email: string;
  id: string;
}

function MainNavbar() {
  const [user, setUser] = React.useState<UserFromAPI | null>(null);
  const router = useRouter();
  const [autoText, setAutoText] = React.useState('Вход');
  const { mode, setMode } = useColorScheme();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const token = Cookies.get('auth_token');

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleMenuItemClick = (page: string) => {
    goToPage(page);
    handleCloseUserMenu();
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const goToPage = async (page: string) => {
    if (page === 'Все сервисы') {
      router.push('/');
    } else if (page === 'Мои сервисы') {
      router.push('/profile');
    } else if (page === 'Вход') {
      router.push('/login');
    } else if (page === 'Выйти') {
      if (token) {
        await logout(token);
        Cookies.remove('auth_token');
        setAutoText('Вход');
        setUser(null);
        window.location.href = '/login';
        window.location.reload();      
      } else {
        window.location.href = '/login';
        window.location.reload();      
      }
    }
  };

  const fetchProfile = async () => {
    setAutoText(token ? 'Выйти' : 'Вход');
    try {
      if (token) {
        const response = await profil(token);
        if (response) {
          setUser(response);
        } else {
          setUser(null); 
        }
      } else {
        setUser(null); 
      }
    } catch (error) {
      setUser(null);
    }
  };

  React.useEffect(() => {
    fetchProfile(); 
  }, [token]);

  const toggleDarkTheme = React.useCallback(() => {
    const currMode = mode === 'dark' ? 'light' : 'dark';
    setMode(currMode);
  }, [mode]);


  const firstLetter = user?.email ? user.email[0].toUpperCase() : ''; 

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ServicesMap
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page} href={page === 'Все сервисы' ? '/' : '/profile'} style={{ textDecoration: 'none' }}>
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, pr: 2 }}>
            <Tooltip title="Цветовая тема">
              <IconButton size='large' color='inherit' onClick={toggleDarkTheme} sx={{ p: 0 }}>
                {mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Настройки">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>{firstLetter}</Avatar> {/* Аватар с первой буквой */}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {pages.concat([autoText]).map((setting) => (
                <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MainNavbar;
