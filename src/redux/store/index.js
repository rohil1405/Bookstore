import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user";
import loginSlice from "./slices/checkLogin";
export const store = configureStore({
  reducer: {
    users: userSlice,
    isLogin: loginSlice,
  },
});
export default store;
