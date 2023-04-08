import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const registration = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('/auth/register', credentials);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('/auth/login', credentials);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const fetchAuthMe = createAsyncThunk(
  'auth/fetchAuthMe',
  async thunkAPI => {
    try {
      const { data } = await axios.get('/auth/me');
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  userData: null,
  isAuth: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.userData = null;
      state.isAuth = false;
      state.isLoading = false;
    },
  },
  extraReducers: {
    [registration.pending]: state => {
      state.userData = null;
      state.isAuth = false;
      state.isLoading = true;
    },
    [registration.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.isAuth = true;
      state.isLoading = false;
    },
    [registration.rejected]: state => {
      state.userData = null;
      state.isAuth = false;
      state.isLoading = false;
    },
    [login.pending]: state => {
      state.userData = null;
      state.isAuth = false;
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.isAuth = true;
      state.isLoading = false;
    },
    [login.rejected]: state => {
      state.userData = null;
      state.isAuth = false;
      state.isLoading = false;
    },
    [fetchAuthMe.pending]: state => {
      state.userData = null;
      state.isAuth = false;
      state.isLoading = true;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.isAuth = true;
      state.isLoading = false;
    },
    [fetchAuthMe.rejected]: state => {
      state.userData = null;
      state.isAuth = false;
      state.isLoading = false;
    },
  },
});

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
