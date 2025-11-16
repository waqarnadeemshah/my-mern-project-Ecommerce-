// import { ReceiptRefundIcon } from "@heroicons/react/16/solid";
// import { createSlice } from "@reduxjs/toolkit";

// const cartslice = createSlice({
//   name: "cart",
//   initialState: [],
//   reducers: {
//     addtocart: (state, action) => {
//       const { itemobj, selectedsize } = action.payload;
//       const existitem = state.find(
//         (items) =>
//           items.id === action.payload.id &&
//           items.selectedsize === action.payload.selectedsize
//       );
//       if (existitem) {
//         existitem.quantity += 1;
//       } else {
//         state.push({ ...action.payload, selectedsize, quantity: 1 });
//       }
//     },
//     removeitemincart: (state, action) => {
//       return state.filter(
//         (items) =>
//           !(
//             items.id === action.payload.id &&
//             items.selectedsize === action.payload.selectedsize
//           )
//       );
//     },
//     incrementquantity: (state, action) => {
//       const item = state.find(
//         (items) =>
//           items.id === action.payload.id &&
//           items.selectedsize === action.payload.selectedsize
//       );
//       if (item) {
//         item.quantity += 1;
//       }
//     },
//     decrementquantity: (state, action) => {
//       const item = state.find(
//         (items) =>
//           items.id === action.payload.id &&
//           items.selectedsize === action.payload.selectedsize
//       );
//       if (item.quantity > 1) {
//       item.quantity-=1
//       } else {
//         return state.filter(
//           (items) =>
//             !(
//               items.id === action.payload.id &&
//               items.selectedsize === action.payload.selectedsize
//             )
//         );
//       }
//     },
//   },
// });
// export const {
//   addtocart,
//   removeitemincart,
//   incrementquantity,
//   decrementquantity,
// } = cartslice.actions;
// export default cartslice.reducer;
