import { useState } from "react";
import axios from "axios";
import "./Login.scss";
import { useAuthStore } from "../../store/app.store";
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            setError("Email and password are required!");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const requestBody = {
                email: email.trim(),  //example12@example.com
                password: password.trim(), // Jone@123
            };

            const response = await axios.post(
                "https://creative-upaay-backend.onrender.com/api/v1/users/login",
                requestBody, 
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                const { Token, user } = response.data.data; 

                setAuth(Token, user); 

                alert(`Welcome, ${user.firstName} ${user.lastName}!`);
                navigate("/");
            } else {
                setError(response.data.message || "Login failed");
            }

            // alert(`Welcome, ${response.data.user?.name || "User"}!`);
            // <button onClick={() => logout()}>Logout</button>
            // const { token, user, logout } = useAuthStore();

            // console.log("Token:", token);
            // console.log("User:", user);
        } catch (err: any) {
            setError(err.response?.data?.message || "Invalid credentials. Try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="container">
            <div className="login-box">
                <h2 className="login-title">Sign in</h2>
                <p className="login-subtitle">Welcome, please sign in to continue</p>

                <div className="input-group">
                    <input
                        type="email"
                        placeholder="Email *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Password *"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>



                {error && <p className="error">{error}</p>}

                <button className="login-btn" onClick={handleLogin} disabled={loading}>
                    {loading ? "Loading..." : "Sign In"}
                </button>
            </div>
        </div>
    );
};

export default Landing;
