import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface AuthState {
  token: string | null;
  _id: string | null;
  name: string | null;
  email: string | null;
  joinedDate: string | null;
  state: string | null;
  country: string | null;
  birthDate: string | null;
  gender: string | null;
  profilePicture: string | null;
  userType: string | null;
  viewRecords: string[];
}

const initialState: AuthState = {
  token: null,
  _id: null,
  name: null,
  email: null,
  joinedDate: null,
  state: null,
  country: null,
  birthDate: null,
  gender: null,
  profilePicture: null,
  userType: null,
  viewRecords: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthState>) {
      return action.payload;
    },
    logout: (state) => {
      return initialState;
    },
  },
});

export const selectUser = (state: RootState) => state.auth;
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
