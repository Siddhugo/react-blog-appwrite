import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

/**
 * Redux store configuration.
 * Includes:
 * - Auth reducer
 * - DevTools only in development (already done)
 * - Optional: custom middleware (e.g., for logging or error handling)
 */

// Optional: custom logging middleware for development
const loggerMiddleware = (store) => (next) => (action) => {
  if (import.meta.env.DEV && action.type !== "auth/setLoading") {
    console.group(`🔄 Redux Action: ${action.type}`);
    console.log("Payload:", action.payload);
    console.log("Prev State:", store.getState());
    const result = next(action);
    console.log("Next State:", store.getState());
    console.groupEnd();
    return result;
  }
  return next(action);
};

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values only in specific paths if needed
        ignoredActions: ["auth/login"],
        ignoredPaths: ["auth.userData"],
      },
    }).concat(import.meta.env.DEV ? [loggerMiddleware] : []),
  devTools: import.meta.env.DEV,
});

// Optional: Export RootState and AppDispatch types for better IDE support (JSDoc)
/**
 * @typedef {ReturnType<typeof store.getState>} RootState
 * @typedef {typeof store.dispatch} AppDispatch
 */

export default store;