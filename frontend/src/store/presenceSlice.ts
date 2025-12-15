import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PresenceState = {
  onlineUsers: Record<string, boolean>;
  loaded: boolean;
};

const initialState: PresenceState = {
  onlineUsers: {},
  loaded: false,
};

const presenceSlice = createSlice({
  name: "presence",
  initialState,
  reducers: {
    userOnline(state, action) {
      state.onlineUsers[action.payload] = true;
      state.loaded = true;
    },
    userOffline(state, action) {
      delete state.onlineUsers[action.payload];
      state.loaded = true;
    },
    resetPresence(state) {
      state.onlineUsers = {};
      state.loaded = false;
    },
  },
});

export const { userOnline, userOffline, resetPresence } =
  presenceSlice.actions;

export default presenceSlice.reducer;
