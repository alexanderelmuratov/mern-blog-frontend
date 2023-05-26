import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

import backgroundImage from '../images/background.jpg';
import defaultLogo from '../images/logo.svg';

export default function HomePage() {
  const logo = defaultLogo;

  return (
    <HomePageWrapper>
      <img src={logo} alt="logo" width={100} style={{ marginBottom: 30 }} />
      <Typography variant="h1" sx={{ color: 'crimson', fontWeight: 700 }}>
        Поделись моментами
      </Typography>
      <Typography variant="h2" sx={{ color: 'teal' }}>
        Поделись жизнью
      </Typography>
    </HomePageWrapper>
  );
}

const HomePageWrapper = styled.div`
  height: calc(100vh - 60px);
  padding-top: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${backgroundImage});
`;
