import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import Post from '../components/Post';
// import PostSkeleton from 'components/Skeleton';
import TagsBlock from '../components/TagsBlock';
import CommentsBlock from '../components/CommentsBlock';

import { fetchPosts } from '../redux/slices/posts';

export default function HomePage() {
  const { posts } = useSelector(state => state.posts);
  const dispatch = useDispatch();

  console.log(posts);

  useEffect(() => {
    dispatch(fetchPosts());
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
          {Array.from(Array(5)).map((_, i) => (
            <div key={i}>
              <Post
              // _id,
              // title,
              // createdAt,
              // imageUrl,
              // user,
              // viewsCount,
              // commentsCount,
              // tags,
              // children,
              // isFullPost,
              // isLoading,
              // isEditable,
              />
              <TagsBlock />
              <CommentsBlock />
            </div>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
