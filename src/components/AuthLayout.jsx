import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

/**
 * AuthLayout – Protects routes based on authentication status.
 * @param {boolean} authentication – true = only logged‑in users; false = only guests.
 */
const AuthLayout = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authentication && !authStatus) {
      navigate("/login", { replace: true });
    } else if (!authentication && authStatus) {
      navigate("/", { replace: true });
    }
    setLoading(false);
  }, [authStatus, navigate, authentication]);

  if (loading) return <LoadingSpinner />;
  return <>{children}</>;
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  authentication: PropTypes.bool,
};

export default AuthLayout;