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
    if (localStorage.getItem('token') && !isAuth) {
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
          <Route path="/posts/:id/edit" element={<AddPostPage />} />
          <Route path="/add-post" element={<AddPostPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
      </Container>
    </Box>
  );
};
