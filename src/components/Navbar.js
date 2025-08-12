import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
    const { auth, logoutUser } = useContext(AuthContext);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <Link className="navbar-brand" to="/">Real Estate Portal</Link>
            <div className="ms-auto">
                {auth.isAuthenticated ? (
                    <>
                        <div class="btn-group">
                            <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                {auth.email}
                            </button>
                            <ul class="dropdown-menu">
                                <li><Link class="dropdown-item" to="/favorites"> <i class="bi bi-heart-fill text-success"></i> View Favorites</Link></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><Link class="dropdown-item" to="#" onClick={logoutUser}> <i class="bi bi-box-arrow-left text-danger"></i> Logout</Link></li>
                            </ul>
                        </div>

                    </>
                ) : (
                    <Link className="btn btn-light" to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
}
