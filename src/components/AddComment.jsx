import React from 'react';
import { useSelector } from 'react-redux';

import { Button, Card, TextField } from '@mui/material';
import UserAvatar from './UserAvatar';

export default function AddComment() {
  const { userData } = useSelector(state => state.auth);

  return (
    <Card sx={styles.commentWrapper}>
      <UserAvatar user={userData} style={styles.userAvatar} />
      <div style={styles.commentForm}>
        <TextField
          id="standard-textarea"
          variant="standard"
          label="Написать комментарий"
          multiline
          maxRows={10}
          fullWidth
        />
        <Button variant="contained" size="large" sx={{ marginLeft: 3 }}>
          Отправить
        </Button>
      </div>
    </Card>
  );
}

const styles = {
  commentWrapper: {
    padding: 4,
    display: 'flex',
    alignItems: 'center',
  },
  userAvatar: {
    width: 56,
    height: 56,
    marginRight: 3,
    bgcolor: 'green',
  },
  commentForm: {
    width: '100%',
    display: 'flex',
  },
};
