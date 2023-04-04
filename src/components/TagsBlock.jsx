import React from 'react';
import { Card, Typography } from '@mui/material';
import { Tag } from '@mui/icons-material';

export default function TagsBlock({ tags, isLoading }) {
  return (
    <Card sx={{ padding: 2, marginBottom: 2 }}>
      <Typography
        variant="h5"
        color="text.primary"
        sx={{ textAlign: 'center', marginBottom: 1 }}
      >
        Теги
      </Typography>
      <ul>
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
      </ul>
    </Card>
  );
}
