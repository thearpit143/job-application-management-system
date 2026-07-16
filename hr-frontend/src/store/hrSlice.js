import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  name: localStorage.getItem("hrName"),
};

const hrSlice = createSlice({
  name: "hr",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.name = action.payload.name;

      // Save to localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("hrName", action.payload.name);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.name = null;

      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("hrName");
    },
  },
});

export const hrAction = hrSlice.actions;
export default hrSlice.reducer;
