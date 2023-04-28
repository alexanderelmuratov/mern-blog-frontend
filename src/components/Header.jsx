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

import defaultLogo from '../images/logo.svg';

export default function Header() {
  const { userData, isAuth } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  console.log(userData);

  const logo = defaultLogo;

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      localStorage.removeItem('token');
    }
  };

  const stringAvatar = name => ({
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  });

  return (
    <AppBar position="static" sx={styles.header}>
      <Toolbar>
        <Container maxWidth="lg" sx={styles.toolbarContainer}>
          <Link to="/" style={styles.logoLink}>
            <img src={logo} alt="logo" width={50} />
          </Link>
          <div>
            {isAuth ? (
              <Box sx={styles.userInfoWrapper}>
                <Typography variant="h6" sx={styles.userName}>
                  {userData.fullName}
                </Typography>
                {userData.avatarUrl ? (
                  <Avatar
                    alt={userData.fullName}
                    src={userData.avatarUrl}
                    sx={styles.userAvatar}
                  />
                ) : (
                  <Avatar
                    {...stringAvatar(userData.fullName)}
                    sx={styles.userAvatar}
                  />
                )}
                <Link to="/add-post" style={{ marginRight: '20px' }}>
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
                  <Button variant="outlined" sx={styles.loginButton}>
                    Вход
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

const styles = {
  header: {
    paddingTop: '10px',
    paddingBottom: '10px',
    fontSize: 40,
    color: '#010101',
    background: '#3f50b5',
  },
  toolbarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoLink: {
    width: '50px',
    height: '50px',
  },
  userInfoWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  userName: {
    marginRight: '20px',
    color: '#fff',
  },
  userAvatar: {
    width: 50,
    height: 50,
    marginRight: '20px',
    bgcolor: 'green',
  },
  loginButton: {
    color: '#fff',
    borderColor: '#fff',
  },
};
