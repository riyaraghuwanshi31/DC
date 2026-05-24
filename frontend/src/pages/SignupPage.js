import React, { useState } from "react";
import api from "../utils/api";
import { setAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {

      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      setAuth(res.data);

      navigate("/");

    } catch (err) {

      console.log(err);
      console.log(err.response);

      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 px-4">

      <div className="w-full max-w-md bg-light-100 border border-light-300 rounded-2xl shadow-xl p-8">

        <h2 className="text-2xl font-bold text-light-900 text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white border border-light-300 text-light-900"
          />

          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white border border-light-300 text-light-900"
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white border border-light-300 text-light-900"
          />

          <button
            type="submit"
            className="w-full bg-primary-500 hover:bg-primary-600 text-light-900 py-2.5 rounded-xl font-semibold"
          >
            Signup
          </button>

        </form>

      </div>

    </div>
  );
};

export default SignupPage;