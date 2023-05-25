import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ConfirmProvider } from 'material-ui-confirm';
import { Box, Container, ThemeProvider, createTheme } from '@mui/material';

import Header from './components/Header';
import Footer from './components/Footer';
import SwitchMode from './components/SwitchMode';
import HomePage from './pages/HomePage';
import FullPostPage from './pages/FullPostPage';
import AddPostPage from './pages/AddPostPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import ScrollToTop from './utils/ScrollToTop';
import { fetchAuthMe } from 'redux/slices/auth';

export const App = () => {
  const [mode, setMode] = useState('light');

  const isAuth = useSelector(state => state.auth.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token') && !isAuth) {
      dispatch(fetchAuthMe());
    }
  }, [isAuth, dispatch]);

  const darkTheme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <ConfirmProvider>
        <Box
          bgcolor={mode === 'light' ? 'antiquewhite' : 'background.default'}
          color={'text.primary'}
          sx={styles.appWrapper}
        >
          <Header />
          <SwitchMode mode={mode} setMode={setMode} />
          <Container maxWidth="lg" sx={{ paddingTop: '84px' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/posts/:id" element={<FullPostPage />} />
              <Route path="/posts/:id/edit" element={<AddPostPage />} />
              <Route path="/add-post" element={<AddPostPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
            </Routes>
          </Container>
          <Footer />
          <ScrollToTop />
        </Box>
      </ConfirmProvider>
    </ThemeProvider>
  );
};

const styles = {
  appWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
};
