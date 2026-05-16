import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [serverError, setServerError] = useState("");

  const create = async (data) => {
    setServerError("");

    try {
      const account = await authService.createAccount(data);

      if (!account) {
        throw new Error("Account creation failed");
      }

      const userData = await authService.getCurrentUser();

      if (!userData) {
        throw new Error("Unable to fetch user data");
      }

      dispatch(authLogin(userData));
      navigate("/");
    } catch (error) {
      setServerError(error?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-full max-w-30">
            <Logo width="100%" />
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl font-bold">
          Sign up to create account
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline transition"
          >
            Sign In
          </Link>
        </p>

        {/* Server Error */}
        {serverError && (
          <p className="text-red-600 mt-6 text-center text-sm">{serverError}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(create)} className="mt-8 space-y-5">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.name}
            {...register("name", {
              required: "Full name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm -mt-3">{errors.name.message}</p>
          )}

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
          {errors.email && (
            <p className="text-red-500 text-sm -mt-3">{errors.email.message}</p>
          )}

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm -mt-3">
              {errors.password.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
