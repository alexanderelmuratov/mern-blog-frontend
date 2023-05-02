import { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Tabs, Tab } from '@mui/material';

import Post from '../components/Post';
import TagsBlock from '../components/TagsBlock';
import CommentsBlock from '../components/CommentsBlock';

import { fetchPosts, fetchTags } from '../redux/slices/posts';

export default function HomePage() {
  const navigate = useNavigate();
  const { posts, tags } = useSelector(state => state.posts);
  const userData = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <>
      <Tabs
        style={{ marginBottom: 20 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые"></Tab>
        <Tab label="Популярные"></Tab>
      </Tabs>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {(posts.isLoading ? [...Array(5)] : posts.items).map((post, index) =>
            posts.isLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              // <Link
              //   key={index}
              //   to={`/posts/${post._id}`}
              //   style={{ color: 'inherit' }}
              // >
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
              // </Link>
            )
          )}
        </Grid>
        <Grid item xs={0} md={4}>
          {/* <Box position="fixed"> */}
          <TagsBlock tags={tags.items} isLoading={tags.isLoading} />
          <CommentsBlock />
          {/* </Box> */}
        </Grid>
      </Grid>
    </>
  );
}
