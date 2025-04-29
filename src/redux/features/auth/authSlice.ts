import { createSlice } from "@reduxjs/toolkit";

type TAuthState = {
  user: null | object;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    // setToken: (state, action) => {
    //   state.token = action.payload;
    // },
    // clearToken: (state) => {
    //   state.token = null;
    // },
    // setUserRole: (state, action) => {
    //     if (state.user) {
    //         state.user.role = action.payload;
    //     }
    //     },
    // clearUserRole: (state) => {
    //     if (state.user) {
    //         delete state.user.role;
    //     }
    // }
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
