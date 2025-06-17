import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./projectSlice";
import authSlice from "./authSlice";
import usersSlice from "./usersSlice";

export const store = configureStore({
    reducer: {
        project: projectSlice,
        auth: authSlice,
        users: usersSlice,
    },
  });