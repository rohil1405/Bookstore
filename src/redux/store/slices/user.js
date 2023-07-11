import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  firstName: "",
  id: 0,
  lastName: "",
  password: "",
  role: "",
  roleId: 0,
  __v: 0,
  _id: "",
};
// const initialState = {};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    _setUser(state, action) {
      return { ...state, ...action.payload };
    },
    _resetUser(state, action) {
      return {};
    },
  },
});

export default userSlice.reducer;
export const { _setUser, _resetUser } = userSlice.actions;
