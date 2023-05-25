import React from 'react';
import {
  Card,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import { Tag } from '@mui/icons-material';

export default function TagsBlock({ tags, isLoading }) {
  return (
    <Card sx={{ padding: 2, marginBottom: 2 }}>
      <Typography
        variant="h5"
        color="text.primary"
        sx={{ textAlign: 'center' }}
      >
        Теги
      </Typography>
      <List sx={{ padding: 2 }}>
        {tags.map(tag => (
          <ListItem
            key={tag}
            sx={{ display: 'flex', alignItems: 'center' }}
            disablePadding
          >
            <ListItemButton sx={{ padding: 0 }}>
              <Tag />
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ marginLeft: '20px' }}
              >
                {tag}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
