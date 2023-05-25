import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useConfirm } from 'material-ui-confirm';
import {
  AppBar,
  Toolbar,
  Container,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import UserAvatar from './UserAvatar';
import { logout } from 'redux/slices/auth';

import defaultLogo from '../images/logo.svg';

export default function Header() {
  const navigate = useNavigate();
  const { userData, isAuth } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const confirm = useConfirm();

  const logo = defaultLogo;

  const onClickLogout = async () => {
    await confirm({
      title: 'Вы действительно хотите выйти?',
      confirmationText: 'Да',
      cancellationText: 'Нет',
    });
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="fixed" sx={styles.header}>
      <Toolbar>
        <Container maxWidth="lg" sx={styles.toolbarContainer}>
          <Link to="/" style={styles.logoLink}>
            <img src={logo} alt="logo" width={50} />
          </Link>
          <Box>
            {isAuth ? (
              <Box sx={styles.userInfoWrapper}>
                <Typography variant="h6" sx={styles.userName}>
                  {userData.fullName}
                </Typography>
                <UserAvatar user={userData} style={styles.userAvatar} />
                <Button
                  variant="contained"
                  color="error"
                  onClick={onClickLogout}
                  sx={{ borderRadius: '50px' }}
                >
                  <Logout />
                </Button>
              </Box>
            ) : (
              <Box>
                <Link to="/login" style={{ marginRight: '20px' }}>
                  <Button variant="outlined" sx={styles.loginButton}>
                    Вход
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </Box>
            )}
          </Box>
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
