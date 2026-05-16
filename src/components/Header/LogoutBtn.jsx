import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";
import PropTypes from "prop-types";

// If you have a toast library, import it, e.g.:
// import toast from "react-hot-toast";

const LogoutBtn = React.memo(() => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const logoutHandler = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      await authService.logout();
      dispatch(logout());
      // Optional success toast
      // toast.success("Logged out successfully");
    } catch (error) {
      console.error("LogoutBtn error:", error);
      // Show user-friendly error
      // toast.error("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  return (
    <button
      onClick={logoutHandler}
      disabled={loading}
      aria-label="Logout"
      className={`
        inline-block px-5 py-2 rounded-full font-medium text-sm transition duration-200
        focus:outline-none focus:ring-2 focus:ring-red-500
        ${
          loading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-red-500 text-white hover:bg-red-600 active:bg-red-700"
        }
      `}
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
});

LogoutBtn.displayName = "LogoutBtn";

LogoutBtn.propTypes = {
  // No props, but keep for consistency
};

export default LogoutBtn;