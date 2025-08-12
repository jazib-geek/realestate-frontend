import { useState, useContext } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setIsSubmitting(true);
            await register(email, password);
            navigate("/login", { state: { successMessage: "Registration successful. You can login now." } });
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="text-center mb-4">Create Account</h3>
                <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}
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
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className="btn btn-success w-100 mt-2" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Creating Account..." : "Register"}
                    </button>
                </form>
                <p className="text-muted small text-center mt-3 mb-0">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}
