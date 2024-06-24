import { createSlice, configureStore } from "@reduxjs/toolkit";

// Function to load the state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) {
      return { isLogin: false };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { isLogin: false };
  }
};

// Function to save the state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("authState", serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const initialState = loadState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});

// Subscribe to store updates to save the state to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

//function that handles login state globally if we dont do this we will have to pass on the props to the other components
