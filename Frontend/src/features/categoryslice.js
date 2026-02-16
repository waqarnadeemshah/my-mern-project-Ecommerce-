import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import API from "../Api/Axios";
export const fetchallcat = createAsyncThunk(
  "api/getcat",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/api/fetchallcat");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
export const fetchallproduct = createAsyncThunk(
  "api/getallproduct",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/api/user/getallproduct");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
export const fetchproductbycat = createAsyncThunk(
  "api/productbycat",
  async ({ maincatid, subCategory }, { rejectWithValue }) => {
    try {
      const res = await API.get(
        `/api/user/getproductbycat/${maincatid}/${subCategory}`,
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
export const detailproduct = createAsyncThunk(
  "api/detailproduct",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.get(`/api/user/getoneproduct/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
export const sortingproducts = createAsyncThunk(
  "/api/sortproduct",
  async ({ mainCategory, subCategory, sorttype }, { rejectWithValue }) => {
    try {
      const res = await API.get(
        `/api/user/sortproduct/${mainCategory}/${subCategory}?sort=${sorttype}`,
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const searchProducts = createAsyncThunk(
  "api/searchProducts",
  async (search, { rejectWithValue }) => {
    try {
      const res = await API.get(`/api/user/search?search=${search}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const categoryslice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    error: null,
    product: [],
    Categories: [],
    productbyCategory: [],
    productdetarray: null,
    productlength: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchallproduct.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(fetchallproduct.fulfilled, (state, action) => {
        ((state.product = action.payload.product),
          (state.loading = false),
          (state.error = null));
      })
      .addCase(fetchallproduct.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })
      .addCase(fetchallcat.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(fetchallcat.fulfilled, (state, action) => {
        ((state.Categories = action.payload.cat),
          (state.loading = false),
          (state.error = null));
      })
      .addCase(fetchallcat.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })
      .addCase(fetchproductbycat.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(fetchproductbycat.fulfilled, (state, action) => {
        ((state.productbyCategory = action.payload.product),
          (state.productlength = action.payload.count),
          (state.loading = false),
          (state.error = null));
      })
      .addCase(detailproduct.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(detailproduct.fulfilled, (state, action) => {
        ((state.loading = false),
          (state.error = null),
          (state.productdetarray = action.payload.productdet));
      })
      .addCase(detailproduct.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })
      .addCase(sortingproducts.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(sortingproducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.productbyCategory = action.payload.products;
      })
      .addCase(sortingproducts.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })

      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.productbyCategory = action.payload.products;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default categoryslice.reducer;
