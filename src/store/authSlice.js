import { createSlice } from "@reduxjs/toolkit";


const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');


const initialState = {
  user: user ? user : null,
  token: token ? token : null,
  isAuthenticated: false,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.error = null;

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }
});

export const { setCredentials, setLoading, setError, logout, loadFromStorage } = authSlice.actions;



export default authSlice.reducer; 