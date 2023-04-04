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
      {/* <ul>
        {tags.map(tag => (
          <li key={tag} style={{ display: 'flex', alignItems: 'center' }}>
            <Tag />
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ marginLeft: '20px' }}
            >
              {tag}
            </Typography>
          </li>
        ))}
      </ul> */}
    </Card>
  );
}
