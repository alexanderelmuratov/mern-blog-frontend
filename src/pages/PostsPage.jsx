import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Tabs, Tab, Box, Container, Typography } from '@mui/material';
import { Tag } from '@mui/icons-material';
import { RotatingTriangles } from 'react-loader-spinner';

import Post from '../components/Post';
import TagsBlock from '../components/TagsBlock';
import CommentsBlock from '../components/CommentsBlock';
import AddPostButton from '../components/AddPostButton';

import {
  fetchPosts,
  fetchPostsByTag,
  fetchTags,
  fetchComments,
} from '../redux/slices/posts';

export default function PostsPage() {
  const [activeTab, setActiveTab] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams({});
  const navigate = useNavigate();

  const { posts, tags, comments } = useSelector(state => state.posts);
  const { userData, isAuth } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const tagQuerry = searchParams.get('tag') || '';

  useEffect(() => {
    if (!tagQuerry) dispatch(fetchPosts(activeTab));
    dispatch(fetchTags());
    dispatch(fetchComments());
  }, [dispatch, activeTab, tagQuerry]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleTagSubmit = value => {
    dispatch(fetchPostsByTag(value));
    if (value) {
      setSearchParams({ tag: value });
    } else {
      setSearchParams({});
    }
  };

  if (!localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Container maxWidth="lg" sx={{ paddingTop: '84px' }}>
      {/* <Box sx={{ position: 'relative' }}> */}
      {tagQuerry ? (
        <Box sx={styles.tagQuerryWrapper}>
          <Typography variant="h5" color="text.primary">
            Статьти с тегом:
          </Typography>
          <Tag color="error" sx={{ marginLeft: 2 }} />
          <Typography variant="h5" color="primary">
            {tagQuerry}
          </Typography>
        </Box>
      ) : (
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          style={{ marginBottom: 16 }}
          aria-label="basic tabs example"
        >
          <Tab label="Новые" />
          <Tab label="Популярные" />
          <Tab label="Личные" />
        </Tabs>
      )}
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
                  post.imageUrl
                    ? `https://mern-blog-backend.herokuapp.com${post.imageUrl}`
                    : ''
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
          {tags.isLoading || comments.isLoading ? (
            <RotatingTriangles
              visible={true}
              height="400"
              width="400"
              ariaLabel="rotating-triangels-loading"
              wrapperStyle={{}}
              wrapperClass="rotating-triangels-wrapper"
            />
          ) : (
            <Box>
              <TagsBlock tags={tags.items} onTagSubmit={handleTagSubmit} />
              <CommentsBlock comments={comments.items} />
            </Box>
          )}
        </Grid>
      </Grid>
      <AddPostButton />
      {/* </Box> */}
    </Container>
  );
}

const styles = {
  tagQuerryWrapper: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    paddingTop: 2,
    paddingBottom: 2,
  },
};
