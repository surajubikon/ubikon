import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
        const response = await axios.post(
            "http://localhost:5000/api/admin/login",
            { email, password },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log("Login Successful:", response.data);
       
        navigate("/dashboard"); 
    } catch (err) {
        console.error("Login Failed:", err);
        setError("Login failed. Please check your credentials.");
    } finally {
        setLoading(false); 
    }
};


  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} 
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
