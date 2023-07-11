import { createSlice } from "@reduxjs/toolkit";

const initialState = false;
export const loginSlice = createSlice({
  name: "is_login",
  initialState,
  reducers: {
    _setIsLogin(state, action) {
      return true;
    },
    _resetIsLogin(state, action) {
      return false;
    },
  },
});

export default loginSlice.reducer;
export const { _setIsLogin, _resetIsLogin } = loginSlice.actions;
