import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Container,
  Button,
  Avatar,
  Box,
  Typography,
} from '@mui/material';

import { logout } from 'redux/slices/auth';

import defaultLogo from '../images/logo1.svg';

export default function Header() {
  const { userData, isAuth } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const logo = defaultLogo;

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      localStorage.removeItem('token');
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        paddingTop: '10px',
        paddingBottom: '10px',
        fontSize: 40,
        color: '#010101',
        background: '#3f50b5',
      }}
    >
      <Toolbar>
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link to="/" style={{ width: '50px', height: '50px' }}>
            <img src={logo} alt="logo" width={50} />
          </Link>
          <div>
            {isAuth ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="h6"
                  sx={{ marginRight: '20px', color: '#fff' }}
                >
                  {userData.fullName}
                </Typography>
                <Avatar
                  alt="Remy Sharp"
                  src="https://mui.com/static/images/avatar/1.jpg"
                  sx={{ width: 50, height: 50, marginRight: '20px' }}
                />
                <Link to="/addpost" style={{ marginRight: '20px' }}>
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Link to="/login">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={onClickLogout}
                  >
                    Выйти
                  </Button>
                </Link>
              </Box>
            ) : (
              <>
                <Link to="/login" style={{ marginRight: '20px' }}>
                  <Button
                    variant="outlined"
                    sx={{
                      color: '#fff',
                      borderColor: '#fff',
                    }}
                  >
                    Войти
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
