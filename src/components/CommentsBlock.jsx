import React from 'react';
import { Card, Typography } from '@mui/material';

export default function CommentsBlock() {
  return (
    <Card sx={{ padding: 2, height: '150px' }}>
      <Typography
        variant="h5"
        color="text.primary"
        sx={{ textAlign: 'center', marginBottom: 1 }}
      >
        Комментарии
      </Typography>
    </Card>
  );
}
