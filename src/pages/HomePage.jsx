import React from 'react';
import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

import backgroundImage from '../images/background.jpg';
import defaultLogo from '../images/logo.svg';

export default function HomePage() {
  const logo = defaultLogo;

  return (
    <HomePageWrapper>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <img src={logo} alt="logo" width={100} style={{ marginBottom: 30 }} />
      </Box>
      <Typography
        variant="h1"
        sx={{
          marginBottom: '20px',
          color: 'crimson',
          fontWeight: 700,
          textAlign: 'center',
          fontSize: { xs: '3rem', lg: '6rem' },
        }}
      >
        Поделись моментами
      </Typography>
      <Typography
        variant="h2"
        sx={{
          color: 'teal',
          textAlign: 'center',
          fontSize: { xs: '2rem', lg: '4rem' },
        }}
      >
        Поделись жизнью
      </Typography>
    </HomePageWrapper>
  );
}

const HomePageWrapper = styled.div`
  height: calc(100vh - 60px);
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${backgroundImage});
`;
// padding-top: 400px;
// margin-top: auto;
