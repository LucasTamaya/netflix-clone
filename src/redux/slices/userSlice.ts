import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  password: string;
}

const initialState = { email: "", password: "" } as UserState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state: UserState, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { setEmail } = userSlice.actions;
