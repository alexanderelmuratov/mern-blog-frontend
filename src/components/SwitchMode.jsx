import React from 'react';
import { Box, Switch } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';

export default function SwitchMode({ mode, setMode }) {
  const handleSwitchMode = () => setMode(mode === 'light' ? 'dark' : 'light');

  return (
    <Box sx={styles.switchModeWrapper}>
      {mode === 'light' ? (
        <DarkMode fontSize="large" color="primary" />
      ) : (
        <LightMode fontSize="large" />
      )}
      <Switch onChange={handleSwitchMode} />
    </Box>
  );
}

const styles = {
  switchModeWrapper: {
    zIndex: 1,
    position: 'fixed',
    top: 100,
    left: { xs: 'calc(100% - 113px)', lg: 30 },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
