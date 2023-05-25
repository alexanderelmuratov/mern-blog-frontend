import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Tabs, Tab, Box } from '@mui/material';

import Post from '../components/Post';
import TagsBlock from '../components/TagsBlock';
import CommentsBlock from '../components/CommentsBlock';
import AddPostButton from '../components/AddPostButton';

import { fetchPosts, fetchTags } from '../redux/slices/posts';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);

  const navigate = useNavigate();

  const { posts, tags } = useSelector(state => state.posts);
  const userData = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(activeTab));
    dispatch(fetchTags());
  }, [dispatch, activeTab]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        style={{ marginBottom: 20 }}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {(posts.isLoading ? [...Array(5)] : posts.items).map((post, index) =>
            posts.isLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={index}
                _id={post._id}
                title={post.title}
                createdAt={post.createdAt}
                imageUrl={
                  post.imageUrl ? `http://localhost:4000${post.imageUrl}` : ''
                }
                author={post.user}
                viewsCount={post.viewsCount}
                commentsCount={post.commentsCount}
                tags={post.tags}
                isEditable={userData?._id === post.user._id}
                onClick={() => navigate(`/posts/${post._id}`)}
              />
            )
          )}
        </Grid>
        <Grid item xs={0} md={4}>
          <Box position="fixed">
            <TagsBlock tags={tags.items} isLoading={tags.isLoading} />
            <CommentsBlock />
          </Box>
        </Grid>
      </Grid>
      <AddPostButton />
    </Box>
  );
}
