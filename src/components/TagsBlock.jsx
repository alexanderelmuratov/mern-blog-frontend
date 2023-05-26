import React from 'react';
import {
  Card,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import { Tag } from '@mui/icons-material';

export default function TagsBlock({ tags, isLoading, onTagSubmit }) {
  return (
    <Card sx={{ padding: 2, marginBottom: 2 }}>
      <Typography
        variant="h5"
        color="text.primary"
        sx={{ textAlign: 'center' }}
      >
        Популярные теги
      </Typography>
      <List sx={{ padding: 2 }}>
        {tags.map(tag => (
          <ListItem
            key={tag}
            sx={{ display: 'flex', alignItems: 'center' }}
            disablePadding
          >
            <ListItemButton
              sx={styles.tagButton}
              onClick={() => onTagSubmit(tag)}
            >
              <Tag />
              <Typography variant="h6" sx={{ marginLeft: '20px' }}>
                {tag}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

const styles = {
  tagButton: {
    padding: 0,
    color: 'text.secondary',
    '&:hover': {
      color: 'text.primary',
    },
  },
};
