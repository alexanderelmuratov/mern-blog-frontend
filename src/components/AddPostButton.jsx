import React from 'react';
import { Link } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import { Fab, Tooltip } from '@mui/material';

export default function AddPostButton() {
  return (
    <Link to="/add-post">
      <Tooltip
        title="Написать статью"
        sx={{
          position: 'fixed',
          bottom: 70,
          left: { xs: 'calc(50% - 25px)', md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <Add />
        </Fab>
      </Tooltip>
    </Link>
  );
}
