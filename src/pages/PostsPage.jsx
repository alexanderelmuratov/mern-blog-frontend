import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  Tabs,
  Tab,
  Box,
  Container,
  Typography,
  Pagination,
  PaginationItem,
} from '@mui/material';
import { ArrowBack, ArrowForward, Tag } from '@mui/icons-material';
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

  const { posts, tags, comments } = useSelector(state => state.posts);
  const { userData, isAuth } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({});

  const tagQuerry = searchParams.get('tag') || '';
  const pageQuerry = Number(searchParams.get('page')) || 1;

  const limitPerPage = 3;
  const totalPages = Math.ceil(posts.totalCount / limitPerPage);

  useEffect(() => {
    tagQuerry
      ? dispatch(fetchPostsByTag(tagQuerry))
      : dispatch(fetchPosts({ activeTab, pageQuerry, limitPerPage }));
    dispatch(fetchTags());
    dispatch(fetchComments());
  }, [dispatch, activeTab, tagQuerry, pageQuerry]);

  const handleTabChange = (_, value) => {
    setActiveTab(value);
    setSearchParams({ page: 1 });
  };

  const handlePageChange = (_, value) => {
    window.scrollTo(0, 0);
    if (value) {
      setSearchParams({ page: value });
    } else {
      setSearchParams({});
    }
  };

  const handleTagSubmit = value => {
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
          {!tagQuerry && (
            <Box sx={styles.paginationWrapper}>
              <Pagination
                count={totalPages}
                page={pageQuerry}
                defaultPage={1}
                onChange={handlePageChange}
                hidePrevButton={!totalPages}
                hideNextButton={!totalPages}
                size="large"
                color="primary"
                renderItem={item => (
                  <PaginationItem
                    slots={{ previous: ArrowBack, next: ArrowForward }}
                    {...item}
                  />
                )}
              />
            </Box>
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
  paginationWrapper: {
    display: 'flex',
    justifyContent: 'center',
    paddingY: 2,
  },
};
