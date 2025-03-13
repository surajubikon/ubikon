import React, { useState } from "react";
import axios from "axios";
import { useNavigate , Link} from "react-router-dom"; 
import api, { baseURL } from '../../API/api.url';
import adminlogin from "../../assets/img/admin_login.png";
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
            `${baseURL}${api.login.url}`,
            { email, password },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        
        
        // Store the token and authentication status
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("token", response.data.token); // Assuming token is returned

        navigate("/dashboard");  // Redirect to dashboard
    } catch (err) {
        console.error("Login Failed:", err);
        setError("Login failed. Please check your credentials.");
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-dark">
      <div className="row shadow-lg bg-white rounded" style={{ width: "900px" }}>
        {/* Left Side - Image Section */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center" style={{ backgroundColor: "#EAF0F7" }}>
          <img
            src={adminlogin}
            alt="Illustration"
            className="img-fluid"
            width={190}
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="col-md-6 p-5">
          <h3 className="text-center text-dark mb-4 fw-bold">Admin</h3>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{borderRadius:"0"}}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{borderRadius:"0"}}
              />
            </div>

           

            <button type="submit" className="default-btn mt-4 w-100" disabled={loading}>
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </form>

          
        </div>
      </div>
    </div>
  );
};

export default Login;
