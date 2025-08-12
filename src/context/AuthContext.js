import { createContext, useState, useEffect } from "react";
import { isLoggedIn, logout } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: isLoggedIn(),
    email: null,
  });

  // Load from localStorage when the app starts
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    if (token && storedEmail) {
      setAuth({ isAuthenticated: true, email: storedEmail });
    }
  }, []);

  const loginUser = (token, email) => {
    // Save in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);

    // Update state
    setAuth({ isAuthenticated: true, email });
  };

  const logoutUser = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setAuth({ isAuthenticated: false, email: null });
  };

  return (
    <AuthContext.Provider value={{ auth, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
