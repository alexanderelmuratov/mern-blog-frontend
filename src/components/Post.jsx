import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useConfirm } from 'material-ui-confirm';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import {
  ArrowBack,
  Comment,
  Delete,
  Edit,
  RemoveRedEye,
} from '@mui/icons-material';
import PostSkeleton from './Skeleton';
import UserAvatar from './UserAvatar';
import { fetchRemovePost } from 'redux/slices/posts';
import axios from '../axios';

export default function Post({
  _id,
  title,
  createdAt,
  image,
  author,
  viewsCount,
  commentsCount,
  tags,
  isFullPost,
  isLoading,
  isEditable,
  children,
  onClick,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const confirm = useConfirm();

  const formatedDate = new Date(createdAt).toLocaleString().slice(0, -3);

  const onClickRemove = async () => {
    await confirm({
      title: 'Вы действительно хотите удалить статью?',
      confirmationText: 'Да',
      cancellationText: 'Нет',
    });
    await dispatch(fetchRemovePost(_id));
    if (image.publicId) {
      await axios.delete(`/uploads/${image.publicId}`);
    }
    navigate('/posts');
  };

  if (isLoading) return <PostSkeleton />;

  return (
    <Card
      sx={{ ...styles.postWrapper, cursor: !isFullPost && 'pointer' }}
      onClick={!isFullPost ? onClick : undefined}
    >
      {isFullPost && (
        <>
          <CardActions sx={styles.postActionsWrapper} disableSpacing>
            <IconButton
              onClick={() => navigate(-1)}
              aria-label="go-back"
              sx={styles.postActionsButton}
            >
              <ArrowBack fontSize="large" />
            </IconButton>
          </CardActions>
          {isEditable && (
            <CardActions
              sx={{ ...styles.postActionsWrapper, right: 0 }}
              disableSpacing
            >
              <Link to={`/posts/${_id}/edit`}>
                <IconButton
                  aria-label="edit"
                  sx={{ ...styles.postActionsButton, marginRight: 1 }}
                >
                  <Edit fontSize="large" />
                </IconButton>
              </Link>
              <IconButton
                onClick={onClickRemove}
                aria-label="delete"
                sx={styles.postActionsButton}
              >
                <Delete fontSize="large" />
              </IconButton>
            </CardActions>
          )}
        </>
      )}
      {image.url && (
        <CardMedia
          component="img"
          height="20%"
          image={image.url}
          alt="Post image"
        />
      )}
      <CardHeader
        avatar={<UserAvatar user={author} style={{ bgcolor: 'green' }} />}
        title={author.fullName}
        subheader={formatedDate}
        sx={{
          paddingLeft: '26px',
          paddingTop: isFullPost && !image.url ? 10 : 2,
        }}
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <Box sx={{ paddingLeft: '10px' }}>
          <Typography variant="h5" color="text.primary">
            {title}
          </Typography>
          {children && <Box sx={{ marginTop: 2 }}>{children}</Box>}
        </Box>
        <ul style={{ display: 'flex', padding: '10px' }}>
          {tags.map(tag => (
            <li key={tag} style={{ marginRight: '10px' }}>
              {tag && (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  fontStyle="italic"
                >
                  #{tag}
                </Typography>
              )}
            </li>
          ))}
        </ul>
        <ul style={{ display: 'flex', padding: '10px' }}>
          <li style={{ display: 'flex', marginRight: '20px' }}>
            <RemoveRedEye />
            <span style={{ marginLeft: '5px' }}>{viewsCount}</span>
          </li>
          <li style={{ display: 'flex' }}>
            <Comment />
            <span style={{ marginLeft: '5px' }}>{commentsCount}</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}

const styles = {
  postWrapper: {
    maxWidth: '100%',
    position: 'relative',
    marginBottom: 2,
  },
  postActionsWrapper: {
    position: 'absolute',
    top: 0,
  },
  postActionsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',

    '&:hover': {
      color: '#fff',
    },
  },
};
