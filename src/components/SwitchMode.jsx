import React from 'react';
import { Box, Switch } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';

export default function SwitchMode({ mode, setMode }) {
  const handleSwitchMode = () => setMode(mode === 'light' ? 'dark' : 'light');

  return (
    <Box sx={styles.switchModeWrapper}>
      {mode === 'light' ? (
        <DarkMode fontSize="large" />
      ) : (
        <LightMode fontSize="large" />
      )}
      <Switch onChange={handleSwitchMode} />
    </Box>
  );
}

const styles = {
  switchModeWrapper: {
    position: 'fixed',
    top: 90,
    left: { xs: 'calc(80%)', md: 30 },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
