import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';
import Post from 'components/Post';
import AddComment from 'components/AddComment';

import axios from '../axios';

export default function FullPostPage() {
  const [fullPost, setFullPost] = useState();
  const [isLoading, setIsLoading] = useState(true);
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

    // setIsLoading(true);
    // axios
    //   .get(`/posts/${id}`)
    //   .then(res => {
    //     setFullPost(res.data);
    //   })
    //   .catch(error => console.log(error))
    //   .finally(setIsLoading(false));
  }, [id]);

  console.log(fullPost);

  return (
    <Box sx={{ marginTop: 3 }}>
      {isLoading ? (
        <Post isLoading={isLoading} />
      ) : (
        <Post
          _id={fullPost._id}
          title={fullPost.title}
          text={fullPost.text}
          createdAt={fullPost.createdAt}
          imageUrl={fullPost.imageUrl}
          user={fullPost.user}
          viewsCount={fullPost.viewsCount}
          commentsCount={fullPost.commentsCount}
          tags={fullPost.tags}
          isFullPost
          isEditable
        />
      )}
      <AddComment />
    </Box>
  );
}
