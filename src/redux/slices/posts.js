import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const { data } = await axios.get('/posts');
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
  try {
    const { data } = await axios.get('/tags');
    return data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  posts: {
    items: [],
    isLoading: false,
  },
  tags: {
    items: [],
    isLoading: false,
  },
  // items: [],
  // isLoading: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers: {
    [fetchPosts.pending]: state => {
      state.posts.items = [];
      state.posts.isLoading = true;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.isLoading = false;
    },
    [fetchPosts.rejected]: state => {
      state.posts.items = [];
      state.posts.isLoading = false;
    },
  },
});

export const postsReducer = postsSlice.reducer;
