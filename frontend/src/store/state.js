import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  accessToken: null,
  refreshToken: null,
  emailNotification: false,
  isGenerating: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode == "light" ? "dark" : "light";
    },

    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },

    setLogout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    setEmailNotifications: (state) => {
      state.emailNotification = !state.emailNotification;
    },
    setUpdateUser: (state, action) => {
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
      state.user.email = action.payload.email;
      state.user.profilePicture = action.payload.profilePicture;
    },
    setIsGenerating: (state) => {
      state.isGenerating = !state.isGenerating;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setEmailNotifications,
  setUpdateUser,
  setIsGenerating
} = authSlice.actions;

export default authSlice.reducer;
