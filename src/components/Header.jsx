import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Header({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-logo">MB</div>
        <span
          className="topbar-menu-icon"
          onClick={onToggleSidebar}
          role="button"
          tabIndex={0}
          title="Toggle sidebar"
        >
          ☰
        </span>
      </div>

      <div className="topbar-right">
        <div className="user-menu" onClick={() => setMenuOpen((v) => !v)}>
          <div className="avatar-circle">{initial}</div>
          <div className="welcome-text">
            Welcome
            <strong>{user?.name || "User"}</strong>
          </div>
          <span>▾</span>

          {menuOpen && (
            <div className="user-dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
