import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API, { setAccessToken } from "../Api/Axios";
export const placeorder = createAsyncThunk(
  "/api/placeorder",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (token) setAccessToken(token);
      const res = await API.post("/api/order/placeorder", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getorders = createAsyncThunk(
  "/api/getorder",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (token) setAccessToken(token);
      const res = await API.get("/api/order/vieworder");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getoneorder = createAsyncThunk(
  "/api/getoneorder",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (token) setAccessToken(token);
      const res = await API.get(`/api/order/viewoneorder/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const updateorderstatus = createAsyncThunk(
  "/api/updateorderstatus",
  async ({ id, Data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (token) setAccessToken(token);
      const res = await API.put(`/api/order/updatestatus/${id}`, Data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getplaceorderstatus = createAsyncThunk(
  "/api/order/placeorderstatus",
  async (userid, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (token) setAccessToken(token);
      const res =await API.get(`/api/order/getplaceorderstatus/${userid}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const orderslice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    error: null,
    orders: [],
    viewoneorder: null,
    getplaceorders: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeorder.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(placeorder.fulfilled, (state) => {
        (state.loading = false), (state.error = null);
      })
      .addCase(placeorder.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(getorders.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getorders.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = null),
          (state.orders = action.payload.orders);
      })
      .addCase(getorders.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(getoneorder.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getoneorder.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = null),
          (state.viewoneorder = action.payload.getoneorder);
      })
      .addCase(getoneorder.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(updateorderstatus.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(updateorderstatus.fulfilled, (state) => {
        (state.loading = false), (state.error = null);
      })
      .addCase(updateorderstatus.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(getplaceorderstatus.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getplaceorderstatus.fulfilled, (state,action) => {
        (state.loading = false),
          (state.error = null),
          (state.getplaceorders = action.payload.order);
      })
      .addCase(getplaceorderstatus.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});
export default orderslice.reducer;
