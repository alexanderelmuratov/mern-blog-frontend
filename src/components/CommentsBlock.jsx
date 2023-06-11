import React from 'react';
import { Box, Card, List, ListItem, Typography } from '@mui/material';
import ClampLines from 'react-clamp-lines';
import UserAvatar from './UserAvatar';

export default function CommentsBlock({ comments, isFullPost }) {
  const formatedDate = date => new Date(date).toLocaleString().slice(0, -3);

  return (
    <Card sx={{ padding: 2 }}>
      <Typography
        variant="h5"
        color="text.primary"
        sx={{ ...styles.title, textAlign: isFullPost ? 'start' : 'center' }}
      >
        {isFullPost ? 'Комментарии' : 'Последние комментарии'}
      </Typography>
      <List sx={{ maxWidth: isFullPost ? '100%' : 360 }}>
        {comments.map(comment => (
          <ListItem key={comment._id} sx={styles.commentItem}>
            <UserAvatar user={comment.user} style={styles.userAvatar} />
            <Box sx={styles.commentWrapper}>
              <Box sx={styles.userDataWrapper}>
                <Typography
                  component="p"
                  variant="body1"
                  color="text.primary"
                  sx={{ marginRight: 2 }}
                >
                  {comment.user.fullName}
                </Typography>
                <Typography
                  component="p"
                  variant="body2"
                  color="text.secondary"
                >
                  {formatedDate(comment.createdAt)}
                </Typography>
              </Box>
              {isFullPost ? (
                <Typography component="p" variant="body2" color="text.primary">
                  {comment.text}
                </Typography>
              ) : (
                <ClampLines
                  text={comment.text}
                  lines={2}
                  ellipsis="..."
                  buttons={false}
                  innerElement="p"
                />
              )}
            </Box>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

const styles = {
  title: {
    marginBottom: 1,
    paddingLeft: '16px',
  },
  commentItem: {
    '&:not(:last-child)': {
      borderBottom: '2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  commentWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  userDataWrapper: {
    display: 'flex',
    alignItems: 'baseline',
    marginBottom: 1,
  },
  userAvatar: {
    marginRight: 3,
    alignSelf: 'baseline',
    bgcolor: 'green',
  },
};
