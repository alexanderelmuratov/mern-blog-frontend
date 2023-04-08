import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async thunkAPI => {
    try {
      const { data } = await axios.get('/posts');
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const fetchTags = createAsyncThunk('tags/fetchTags', async thunkAPI => {
  try {
    const { data } = await axios.get('/tags');
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue();
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
    [fetchTags.pending]: state => {
      state.tags.items = [];
      state.tags.isLoading = true;
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.isLoading = false;
    },
    [fetchTags.rejected]: state => {
      state.tags.items = [];
      state.tags.isLoading = false;
    },
  },
});

export const postsReducer = postsSlice.reducer;
