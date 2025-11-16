import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API, { setAccessToken } from "../Api/Axios";
export const addtocart = createAsyncThunk(
  "/api/addtocart",
  async (Data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (token) setAccessToken(token);
      const res = await API.post("/api/cart/addtocart", Data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getcart = createAsyncThunk(
  "/api/getcart",
  async (userid, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (token) setAccessToken(token);
      const res = await API.get(`/api/cart/cartview/${userid}`);
   
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const incrementquantity=createAsyncThunk('/api/increment',async(data,{rejectWithValue})=>{
  try {
         const token = localStorage.getItem("token");
      if (token) setAccessToken(token);
    const res=await API.post('/api/cart/incresequanlity',data)
    return res.data
    
  } catch (err) {
       return rejectWithValue(err.response.data);
  }
}) 
export const decrementquantity=createAsyncThunk('/api/decrement',async(data,{rejectWithValue})=>{
  try {
         const token = localStorage.getItem("token");
      if (token) setAccessToken(token);
    const res=await API.post('/api/cart/decresequanlity',data)
    return res.data
    
  } catch (err) {
       return rejectWithValue(err.response.data);
  }
})
export const removeitem=createAsyncThunk('/api/removeitem',async(data,{rejectWithValue})=>{
  try {
         const token = localStorage.getItem("token");
      if (token) setAccessToken(token);
    const res=await API.post('/api/cart/removecartitem',data)
    return res.data
    
  } catch (err) {
       return rejectWithValue(err.response.data);
  }
})
const cartslice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    error: null,
    cartdata:null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addtocart.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(addtocart.fulfilled, (state) => {
        (state.loading = false), (state.error = null);
      })
      .addCase(addtocart.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(getcart.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getcart.fulfilled, (state, action) => {
     
        

        (state.loading = false),
          (state.error = null),
          (state.cartdata = action.payload.cartdata);
      })
      .addCase(getcart.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      }).addCase(incrementquantity.pending,(state)=>{
          (state.loading = true), (state.error = null);
      }).addCase(incrementquantity.fulfilled,(state)=>{
        (state.loading = false), (state.error = null);

      }).addCase(incrementquantity.rejected,(state,action)=>{
        (state.loading = false), (state.error = action.payload);

  })     .addCase(decrementquantity.pending,(state)=>{
          (state.loading = true), (state.error = null);
      }).addCase(decrementquantity.fulfilled,(state)=>{
        (state.loading = false), (state.error = null);

      }).addCase(decrementquantity.rejected,(state,action)=>{
        (state.loading = false), (state.error = action.payload);

  })  .addCase(removeitem.pending,(state)=>{
          (state.loading = true), (state.error = null);
      }).addCase(removeitem.fulfilled,(state)=>{
        (state.loading = false), (state.error = null);

      }).addCase(removeitem.rejected,(state,action)=>{
        (state.loading = false), (state.error = action.payload);

  })
  },
});
export default cartslice.reducer;
