import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (activeTab, thunkAPI) => {
    try {
      if (activeTab === 0) {
        const { data } = await axios.get('/posts/new');
        return data;
      }
      if (activeTab === 1) {
        const { data } = await axios.get('/posts/popular');
        return data;
      }
      if (activeTab === 2) {
        const { data } = await axios.get('/posts/own');
        return data;
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const fetchPostsByTag = createAsyncThunk(
  'posts/fetchPostsByTag',
  async (value, thunkAPI) => {
    try {
      const { data } = await axios.get(`/posts?tag=${value}`);
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

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async thunkAPI => {
    try {
      const { data } = await axios.get('/comments');
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const fetchRemovePost = createAsyncThunk(
  'posts/fetchRemovePost',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/posts/${id}`);
      return id;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  posts: {
    items: [],
    isLoading: false,
  },
  tags: {
    items: [],
    isLoading: false,
  },
  comments: {
    items: [],
    isLoading: false,
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers: {
    // Получение статей
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
    // Получение статей по тегу
    [fetchPostsByTag.pending]: state => {
      state.posts.items = [];
      state.posts.isLoading = true;
    },
    [fetchPostsByTag.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.isLoading = false;
    },
    [fetchPostsByTag.rejected]: state => {
      state.posts.items = [];
      state.posts.isLoading = false;
    },
    // Получение тегов
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
    // Получение комментариев
    [fetchComments.pending]: state => {
      state.comments.items = [];
      state.comments.isLoading = true;
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.isLoading = false;
    },
    [fetchComments.rejected]: state => {
      state.comments.items = [];
      state.comments.isLoading = false;
    },
    // Удаление статьи
    [fetchRemovePost.pending]: state => {
      state.posts.isLoading = true;
    },
    [fetchRemovePost.fulfilled]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        item => item._id !== action.payload
      );
      state.posts.isLoading = false;
    },
    [fetchRemovePost.rejected]: state => {
      state.posts.isLoading = false;
    },
  },
});

export const postsReducer = postsSlice.reducer;
