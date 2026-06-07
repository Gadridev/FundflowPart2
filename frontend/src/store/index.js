import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import projectReducer from "./projectSlice";
import investmentReducer from "./investmentSlice";
import walletReducer from "./walletSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    investments: investmentReducer,
    wallet: walletReducer,
  },
});

export default store;
