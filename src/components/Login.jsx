import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [serverError, setServerError] = useState("");

  const login = async (data) => {
    setServerError("");
    try {
      const session = await authService.login(data);
      if (!session) throw new Error("Login failed. Please try again.");
      const userData = await authService.getCurrentUser();
      if (!userData) throw new Error("Unable to fetch user data.");
      dispatch(authLogin(userData));
      navigate("/");
    } catch (error) {
      setServerError(error?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <div className="mb-6 flex justify-center">
          <Logo width="100%" />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-600 dark:text-blue-400 hover:underline transition"
          >
            Sign Up
          </Link>
        </p>
        {serverError && (
          <p className="text-red-600 dark:text-red-400 mt-6 text-center text-sm">{serverError}</p>
        )}
        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={errors.email}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
          />
          <Button
            type="submit"
            className="w-full"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;