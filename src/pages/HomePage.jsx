import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

import backgroundImage from '../images/background.jpg';

export default function HomePage() {
  return (
    <HomePageWrapper>
      <Typography variant="h1">Поделись моментами</Typography>
      <Typography variant="h2">Поделись жизнью</Typography>
    </HomePageWrapper>
  );
}

const HomePageWrapper = styled.div`
  height: calc(100vh - 60px);
  padding-top: 500px;
  color: teal;
  // font-weight: bold;
  text-align: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${backgroundImage});
`;
