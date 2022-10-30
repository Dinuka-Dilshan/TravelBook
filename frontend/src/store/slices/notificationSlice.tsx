import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Notification {
  message: string;
  type:'ERROR'|'WARNING'|'INFORMATION'|'SUCCESS'
}

const initialState: Notification[] = [];

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notify: (state, action: PayloadAction<Notification>) => {
      return [action.payload, ...state];
    },
    remove: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
  },
});

export const selectNotification = (state: RootState) => state.notification;
export const { notify, remove } = notificationSlice.actions;
export default notificationSlice.reducer;
