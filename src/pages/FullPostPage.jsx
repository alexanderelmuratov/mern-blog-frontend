import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Box } from '@mui/material';
import Post from 'components/Post';
import AddComment from 'components/AddComment';

import axios from '../axios';

export default function FullPostPage() {
  const [fullPost, setFullPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuth = useSelector(state => state.auth.isAuth);

  const { id } = useParams();

  useEffect(() => {
    const fetchFullPost = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/posts/${id}`);
        setFullPost(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFullPost();
  }, [id]);

  if (!localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ marginTop: 3 }}>
      {isLoading ? (
        <Post isLoading={isLoading} />
      ) : (
        <>
          <Post
            _id={fullPost._id}
            title={fullPost.title}
            text={fullPost.text}
            createdAt={fullPost.createdAt}
            imageUrl={
              fullPost.imageUrl
                ? `http://localhost:4000${fullPost.imageUrl}`
                : ''
            }
            author={fullPost.user}
            viewsCount={fullPost.viewsCount}
            commentsCount={fullPost.commentsCount}
            tags={fullPost.tags}
            isFullPost
            isEditable
          >
            <ReactMarkdown
              children={fullPost.text}
              remarkPlugins={[remarkGfm]}
            />
          </Post>
          <AddComment />
        </>
      )}
    </Box>
  );
}
