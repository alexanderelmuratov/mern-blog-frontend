import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import FullPostPage from './pages/FullPostPage';
import AddPostPage from './pages/AddPostPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';

export const App = () => {
  return (
    <Box sx={{ bgcolor: 'antiquewhite' }}>
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