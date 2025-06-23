import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, LogOut, SlidersHorizontal, Menu, X, Plus } from "lucide-react";
import "../Styles/PanelAjustes.css";

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/emprendedor", icon: <Home size={22} />, name: "Inicio" },
    {path: "/ajustes", icon: <SlidersHorizontal size={22} />,name: "Ajustes" },
    { path: "/nuevo-negocio", icon: <Plus size={22} />, name: "Nuevo Negocio" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("idUsuario");
    onLogout();
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <aside
        className="sidebar-desktop"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="sidebar-header">
          <span className="logo">JAMFLOK</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate(item.path)}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button
            onClick={handleLogout}
            className="nav-item logout"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleLogout()}
          >
            <LogOut size={22} />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div className="sidebar-mobile">
        <div className="mobile-header">
          <span className="logo">JAMFLOK</span>
          <button
            onClick={toggleMobileMenu}
            className="mobile-menu-toggle"
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {isMobileMenuOpen && (
          <nav className="mobile-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `nav-item ${isActive ? "active" : ""}`
                }
                onClick={() => setMobileMenuOpen(false)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate(item.path)}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="nav-item logout"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleLogout()}
            >
              <LogOut size={22} />
              <span>Cerrar sesión</span>
            </button>
          </nav>
        )}
      </div>
    </>
  );
};

export default Sidebar;
