import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container } from '@mui/material';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import FullPostPage from './pages/FullPostPage';
import AddPostPage from './pages/AddPostPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import { fetchAuthMe } from 'redux/slices/auth';

export const App = () => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuth) {
      dispatch(fetchAuthMe());
    }
  }, [isAuth, dispatch]);

  return (
    <Box sx={{ bgcolor: 'antiquewhite', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:id" element={<FullPostPage />} />
          <Route path="/add-post" element={<AddPostPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
      </Container>
    </Box>
  );
};

// style={{
//   height: '100vh',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   fontSize: 40,
//   color: '#010101',
// }}
