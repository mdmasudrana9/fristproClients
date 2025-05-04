import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};
type TAuthState = {
  user: null | TUser;
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
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
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
export const selectUser = (state: { auth: TAuthState }) => state.auth.user;
export const selectToken = (state: { auth: TAuthState }) => state.auth.token;
