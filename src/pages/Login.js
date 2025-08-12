import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { login } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (location.state?.successMessage) {
            setSuccessMessage(location.state.successMessage);
            setTimeout(() => setSuccessMessage(""), 3000);
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const data = await login(email, password);
            loginUser(data.token, data.email);
            setIsSubmitting(false);
            navigate("/");
        } catch (err) {
            setError("Invalid credentials");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="text-center mb-4">
                    <i className="bi bi-lock-fill text-info"></i> LOGIN
                </h3>
                {error && <div className="alert alert-danger fw-bold"><i className="bi bi-exclamation-circle-fill"></i> {error}</div>}
                {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className="btn btn-primary w-100 mt-2" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="text-muted small text-center mt-3 mb-0">
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
