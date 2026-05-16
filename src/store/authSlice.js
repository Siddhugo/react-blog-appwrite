import { createSlice } from "@reduxjs/toolkit";

/**
 * Authentication state structure
 * @typedef {Object} AuthState
 * @property {boolean} status - Whether user is logged in
 * @property {Object|null} userData - The user object from Appwrite
 * @property {boolean} loading - Loading flag for async actions
 * @property {string|null} error - Last error message (if any)
 */

/** @type {AuthState} */
const initialState = {
  status: false,
  userData: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set loading state (useful for async login/logout)
    setLoading: (state, action) => {
      state.loading = action.payload;
      if (action.payload === false) {
        // Clear error when loading finishes (optional)
        state.error = null;
      }
    },

    // Called after successful login
    login: {
      reducer: (state, action) => {
        state.status = true;
        state.userData = action.payload;
        state.loading = false;
        state.error = null;
      },
      // Prepare callback to ensure payload is serializable
      prepare: (userData) => ({ payload: userData }),
    },

    // Called after logout
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.loading = false;
      state.error = null;
    },

    // Store any authentication error (e.g., invalid credentials)
    setAuthError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Action creators
export const { login, logout, setLoading, setAuthError } = authSlice.actions;

// ---------- SELECTORS (for use in components) ----------
/**
 * Check if user is authenticated
 * @param {Object} state - Redux root state
 * @returns {boolean}
 */
export const selectIsAuthenticated = (state) => state.auth.status;

/**
 * Get current user data
 * @param {Object} state
 * @returns {Object|null}
 */
export const selectUser = (state) => state.auth.userData;

/**
 * Get loading flag
 * @param {Object} state
 * @returns {boolean}
 */
export const selectAuthLoading = (state) => state.auth.loading;

/**
 * Get last error message
 * @param {Object} state
 * @returns {string|null}
 */
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;