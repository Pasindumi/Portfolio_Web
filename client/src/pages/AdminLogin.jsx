import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserShield, FaEnvelope, FaLock } from "react-icons/fa";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const adminEmail = "pasinduamarasinghe0528@gmail.com";
        const adminPassword = "pasindu@sachiniportfolio2002";

        if (email === adminEmail && password === adminPassword) {
            localStorage.setItem("adminToken", "secret-token");
            navigate("/admin/dashboard");
        } else {
            setError("Access Denied: Invalid Credentials");
        }
    };

    return (
        <div className="admin-login-page">
            <div className="blobs">
                <div className="blob"></div>
                <div className="blob"></div>
            </div>

            <motion.div
                className="login-glass-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="login-header">
                    <div className="icon-wrapper">
                        <FaUserShield />
                    </div>
                    <h1>System Admin</h1>
                    <p>Please enter your credentials to access the secure panel</p>
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-group">
                        <FaEnvelope className="input-icon" />
                        <input
                            type="email"
                            placeholder="Admin Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <motion.div
                            className="error-bubble"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            {error}
                        </motion.div>
                    )}

                    <button type="submit" className="login-submit">
                        Authorize Access
                    </button>
                </form>

                <div className="login-footer">
                    <button onClick={() => navigate("/")} className="back-home">
                        Return to Portfolio
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
