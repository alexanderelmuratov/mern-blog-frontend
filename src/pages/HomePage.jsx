import React from 'react';
import { Box, Typography } from '@mui/material';

import backgroundImage from '../images/background.jpg';
import defaultLogo from '../images/logo.svg';

export default function HomePage() {
  const logo = defaultLogo;

  return (
    <Box sx={styles.homePageWrapper}>
      <Box sx={styles.logoWrapper}>
        <img src={logo} alt="logo" width={100} />
      </Box>
      <Typography variant="h1" sx={styles.title}>
        Поделись моментами
      </Typography>
      <Typography variant="h2" sx={styles.subTitle}>
        Поделись жизнью
      </Typography>
    </Box>
  );
}

const styles = {
  homePageWrapper: {
    height: 'calc(100vh - 60px)',
    paddingTop: '160px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: `url(${backgroundImage})`,
  },
  logoWrapper: {
    display: {
      xs: 'none',
      md: 'block',
    },
    marginBottom: '50px',
  },
  title: {
    marginBottom: '20px',
    color: 'crimson',
    fontWeight: 700,
    textAlign: 'center',
    fontSize: { xs: '3rem', lg: '6rem' },
  },
  subTitle: {
    color: 'teal',
    textAlign: 'center',
    fontSize: { xs: '2rem', lg: '4rem' },
  },
};
