import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Tabs, Tab } from '@mui/material';

import Post from '../components/Post';
import TagsBlock from '../components/TagsBlock';
import CommentsBlock from '../components/CommentsBlock';

import { fetchPosts, fetchTags } from '../redux/slices/posts';

export default function HomePage() {
  const { posts, tags } = useSelector(state => state.posts);
  const dispatch = useDispatch();

  console.log(posts);

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
        <Grid item xs={8}>
          {(posts.isLoading ? [...Array(5)] : posts.items).map((post, index) =>
            posts.isLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={index}
                _id={post._id}
                title={post.title}
                createdAt={post.createdAt}
                imageUrl={post.imageUrl}
                user={post.user}
                viewsCount={post.viewsCount}
                commentsCount={post.commentsCount}
                tags={post.tags}
                isEditable
              />
            )
          )}
        </Grid>
        <Grid item xs={4}>
          <TagsBlock tags={tags.items} isLoading={tags.isLoading} />
          <CommentsBlock />
        </Grid>
      </Grid>
    </>
  );
}
