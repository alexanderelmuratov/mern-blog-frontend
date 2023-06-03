import React from 'react';
import { Link } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import { Fab, Tooltip } from '@mui/material';

export default function AddPostButton() {
  return (
    <Link to="/add-post">
      <Tooltip title="Написать статью" sx={styles.button}>
        <Fab color="primary" aria-label="add">
          <Add />
        </Fab>
      </Tooltip>
    </Link>
  );
}

const styles = {
  button: {
    position: 'fixed',
    bottom: 70,
    left: { xs: 'calc(50% - 25px)', md: 30 },
    zIndex: 100,
  },
};
