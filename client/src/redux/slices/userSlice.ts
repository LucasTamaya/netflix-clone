import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  password: string;
  isAuthenticated: boolean;
}

const initialState = {
  email: "",
  password: "",
  isAuthenticated: false,
} as UserState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state: UserState, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    authenticate: (state: UserState, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    deauthenticate: (state: UserState, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setEmail, authenticate, deauthenticate } = userSlice.actions;
