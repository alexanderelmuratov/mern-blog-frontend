import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Container, Button } from '@mui/material';

import defaultLogo from '../images/logo1.svg';

export default function Header() {
  const logo = defaultLogo;
  const isAuth = false;

  const onClickLogout = () => {};

  return (
    <AppBar
      position="static"
      sx={{
        // height: '80px',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
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
              <>
                <Link to="/posts/create" style={{ marginRight: '20px' }}>
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button
                  variant="contained"
                  color="error"
                  onClick={onClickLogout}
                >
                  Выйти
                </Button>
              </>
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
