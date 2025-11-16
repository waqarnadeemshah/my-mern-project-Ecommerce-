import { configureStore } from "@reduxjs/toolkit";

import authreducer from "../features/auth";
import adminproductslicereducer from "../features/adminproductslice";
import categoryslicereducer from "../features/categoryslice";
import cartslicereducer from "../features/cartslice";
import Orderslicereducer from "../features/Orderslice";

const store = configureStore({
  reducer: {


    auth: authreducer,
    adminproductslice: adminproductslicereducer,
    category: categoryslicereducer,
    cart: cartslicereducer,
    order: Orderslicereducer,
  },
});
export default store;
