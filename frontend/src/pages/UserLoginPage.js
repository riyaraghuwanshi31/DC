import React, { useState } from "react";
import api from "../utils/api";
import { setAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      
      setAuth(res.data);
     
      navigate("/");

    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 px-4">
      <div className="w-full max-w-md bg-dark-900 border border-dark-700 rounded-2xl shadow-xl p-8">

        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Login
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm text-dark-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl bg-dark-800 border border-dark-700 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-dark-300 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl bg-dark-800 border border-dark-700 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2.5 rounded-xl font-semibold transition-all"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-dark-400 text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;