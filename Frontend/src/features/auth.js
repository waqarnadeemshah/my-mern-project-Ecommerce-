import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API, { setAccessToken } from "../Api/Axios";

export const signup = createAsyncThunk(
  "auth/signup",
  async (FormData, { rejectWithValue }) => {
    try {
      const res = await API.post("/api/auth/signup", FormData);
      console.log(res);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const login = createAsyncThunk(
  "/api/auth/login",
  async (FormData, { rejectWithValue }) => {
    try {
      const res = await API.post("/api/auth/login", FormData);
      localStorage.setItem("token", res.data.acesstoken);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: res.data.userid,
          role: res.data.userrole,
          name: res.data.username,
        })
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const logout = createAsyncThunk(
  "/api/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.post("/api/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const authslice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    signupSuccess: false,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(signup.fulfilled, (state) => {
        (state.loading = false), (state.signupSuccess = true);
      })
      .addCase(signup.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(login.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        (state.token = action.payload.acesstoken),
          (state.user = {
            id: action.payload.userid,
            role: action.payload.userrole,
            name: action.payload.username,
          });
        setAccessToken(action.payload.acesstoken);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(logout.fulfilled, (state, action) => {
        (state.loading = false),
          (state.user = null),
          (state.token = null),
          (state.error = null);
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
      });
  },
});
export default authslice.reducer;
