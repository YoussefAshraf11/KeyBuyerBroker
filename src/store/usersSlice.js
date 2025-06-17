import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    brokers: [],
  },
  reducers: {
    setBrokers: (state, action) => {
      state.brokers = action.payload;
    },
    clearBrokers: (state) => {
      state.brokers = [];
    },
  },
});

export const { setBrokers, clearBrokers } = usersSlice.actions;
export default usersSlice.reducer;
