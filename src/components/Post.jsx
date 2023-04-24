import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  // List,
  // ListItem,
  Typography,
} from '@mui/material';
import { Comment, Delete, Edit, RemoveRedEye } from '@mui/icons-material';
import PostSkeleton from './Skeleton';
import { fetchRemovePost } from 'redux/slices/posts';

export default function Post({
  _id,
  title,
  // text,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  isFullPost,
  isLoading,
  isEditable,
  children,
}) {
  const dispatch = useDispatch();

  const formatedDate = new Date(createdAt).toLocaleString();

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить статью?')) {
      dispatch(fetchRemovePost(_id));
    }
  };

  if (isLoading) return <PostSkeleton />;

  return (
    <Card sx={{ maxWidth: '100%', position: 'relative', marginBottom: 2 }}>
      {isEditable && (
        <CardActions
          sx={{ position: 'absolute', top: 0, right: 0 }}
          disableSpacing
        >
          <Link to={`/posts/${_id}/edit`}>
            <IconButton aria-label="edit">
              <Edit />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} aria-label="delete">
            <Delete />
          </IconButton>
        </CardActions>
      )}
      {imageUrl && (
        <CardMedia
          component="img"
          height="20%"
          image={imageUrl}
          alt="Post image"
        />
      )}
      <CardHeader
        avatar={<Avatar src={user.avatarUrl} aria-label="recipe" />}
        title={user.fullName}
        subheader={formatedDate}
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <Box sx={{ paddingLeft: '10px' }}>
          <Typography variant="h5" color="text.primary">
            {isFullPost ? (
              title
            ) : (
              <Link to={`/posts/${_id}`} style={{ color: 'inherit' }}>
                {title}
              </Link>
            )}
          </Typography>
          {children && <Box sx={{ marginTop: 2 }}>{children}</Box>}
        </Box>
        <ul style={{ display: 'flex', padding: '10px' }}>
          {tags.map(tag => (
            <li key={tag} style={{ marginRight: '10px' }}>
              <Typography
                variant="body1"
                color="text.secondary"
                fontStyle="italic"
              >
                #{tag}
              </Typography>
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
