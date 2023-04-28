import React from 'react';

import { Avatar, Button, Card, TextField } from '@mui/material';

export default function AddComment() {
  return (
    <Card sx={styles.commentWrapper}>
      <Avatar
        alt="Remy Sharp"
        src="https://mui.com/static/images/avatar/1.jpg"
        sx={{ width: 56, height: 56 }}
      />
      <div style={styles.commentForm}>
        <TextField
          id="outlined-multiline-flexible"
          label="Написать комментарий"
          multiline
          maxRows={10}
          fullWidth
        />
        <Button variant="contained" sx={{ marginTop: '20px' }}>
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
    flexDirection: 'column',
    alignItems: 'center',
  },
  commentForm: {
    width: '50%',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};
