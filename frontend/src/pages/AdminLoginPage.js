import React, { useState } from "react";
import api from "../utils/api";
import { setAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
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

       

            // Check admin role
            if (res.data.role !== "admin") {

                alert("Access denied. Admins only.");

                return;
            }

            // Save auth data
            setAuth(res.data);



            // Redirect admin dashboard
            navigate("/admin");

        } catch (err) {

            console.log(err);

            alert("Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-950 px-4">
            <div className="w-full max-w-md bg-light-100 border border-light-300 rounded-2xl shadow-xl p-8">

                {/* Title */}
                <h2 className="text-2xl font-bold text-light-900 text-center mb-2">
                    Admin Panel
                </h2>

                <p className="text-center text-dark-400 mb-6">
                    Authorized access only
                </p>

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
                            className="w-full px-4 py-2 rounded-xl bg-white border border-light-300 text-light-900 placeholder-light-500 focus:outline-none focus:border-primary-500"
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
                            className="w-full px-4 py-2 rounded-xl bg-white border border-light-300 text-light-900 placeholder-light-500 focus:outline-none focus:border-primary-500"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-primary-500 hover:bg-primary-600 text-light-900 py-2.5 rounded-xl font-semibold transition-all"
                    >
                        Login
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-dark-400 text-sm mt-6">
                    Only admins are allowed to login
                </p>
            </div>
        </div>
    );
};

export default AdminLoginPage;
