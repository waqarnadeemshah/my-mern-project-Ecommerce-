import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API, { setAccessToken } from "../Api/Axios";
export const createproduct = createAsyncThunk(
  "/api/createproduct",
  async (Data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (token) setAccessToken(token);

      const res = await API.post("/api/admin/postproduct", Data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getallproduct = createAsyncThunk(
  "/api/getproduct",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (token) setAccessToken(token);
      const res = await API.get("/api/admin/fetchproduct");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const updateproduct = createAsyncThunk(
  "/api/admin/updateproduct",
  async ({ id, Data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (token) setAccessToken(token);
      const res = await API.put(`/api/admin/updateproduct/${id}`, Data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const delproduct = createAsyncThunk(
  "/api/admin/delproduct",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (token) setAccessToken(token);
      const res = await API.delete(`/api/admin/delproduct/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const admingetoneproduct = createAsyncThunk(
  "/api/admin/admingetoneproduct",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (token) setAccessToken(token);
      const res = await API.get(`/api/admin/admingetoneproduct/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const productslice = createSlice({
  name: "productslice",
  initialState: {
    products: [],
    productdetarr: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createproduct.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(createproduct.fulfilled, (state) => {
        (state.loading = false), (state.error = null);
      })
      .addCase(createproduct.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(getallproduct.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getallproduct.fulfilled, (state, action) => {
        (state.loading = false), (state.error = null);
        state.products = action.payload.fetchproducts;
      })
      .addCase(getallproduct.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(updateproduct.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(updateproduct.fulfilled, (state) => {
        (state.loading = false), (state.error = null);
      })
      .addCase(updateproduct.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(delproduct.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(delproduct.fulfilled, (state) => {
        (state.loading = false), (state.error = null);
      })
      .addCase(delproduct.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(admingetoneproduct.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(admingetoneproduct.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = null),
          (state.productdetarr = action.payload.productdet);
      })
      .addCase(admingetoneproduct.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});
export default productslice.reducer;
