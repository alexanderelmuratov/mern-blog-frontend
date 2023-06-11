import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Button, Card, TextField } from '@mui/material';
import { Send } from '@mui/icons-material';
import UserAvatar from './UserAvatar';

export default function AddComment({ onCommentSubmit }) {
  const [text, setText] = useState('');

  const { userData } = useSelector(state => state.auth);

  return (
    <Card sx={styles.commentWrapper}>
      <UserAvatar user={userData} style={styles.userAvatar} />
      <TextField
        value={text}
        onChange={e => setText(e.target.value)}
        id="standard-textarea"
        variant="standard"
        label="Написать комментарий"
        multiline
        maxRows={10}
        fullWidth
      />
      <Button
        type="submit"
        onClick={() => {
          onCommentSubmit(text);
          setText('');
        }}
        variant="contained"
        sx={{ marginLeft: 3, padding: 2, alignSelf: 'end' }}
      >
        <Send />
      </Button>
    </Card>
  );
}

const styles = {
  commentWrapper: {
    padding: 4,
    marginTop: 2,
    display: 'flex',
    alignItems: 'center',
  },
  userAvatar: {
    width: 56,
    height: 56,
    marginRight: 3,
    alignSelf: 'baseline',
    bgcolor: 'green',
  },
  commentForm: {
    width: '100%',
    display: 'flex',
  },
};
