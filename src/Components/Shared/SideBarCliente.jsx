import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, LogOut, SlidersHorizontal, Menu, X, Star } from "lucide-react";
import "../Styles/Sidebar.css";
import logo from "../../../public/Logo.png";

const SideBarCliente = ({ onLogout }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/cliente", icon: <Home size={22} />, name: "Inicio" },
    { path: "/ajustesCliente", icon: <SlidersHorizontal size={22} />, name: "Ajustes" },
    { path: "/favoritos", icon: <Star size={22} />, name: "Favoritos" },
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
      <aside className="sidebar-desktop-xps9" role="navigation" aria-label="Main navigation">
        <div className="sidebar-header-xps9">
          <img src={logo} alt="Logo" className="logo-xps9" />
        </div>
        <nav className="sidebar-nav-xps9">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `nav-item-xps9 ${isActive ? "nav-item-active-xps9" : ""}`
              }
            >
              {item.icon}
              <span className="nav-label-xps9">{item.name}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer-xps9">
          <button onClick={handleLogout} className="nav-item-xps9 logout-xps9">
            <LogOut size={22} />
            <span className="nav-label-xps9">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div className="sidebar-mobile-xps9">
        <div className="mobile-header-xps9">
          <span className="mobile-logo-xps9">JAMFLOK</span>
          <button onClick={toggleMobileMenu} className="mobile-menu-toggle-xps9">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {isMobileMenuOpen && (
          <nav className="mobile-nav-xps9">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `nav-item-xps9 ${isActive ? "nav-item-active-xps9" : ""}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                <span className="nav-label-xps9">{item.name}</span>
              </NavLink>
            ))}
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="nav-item-xps9 logout-xps9"
            >
              <LogOut size={22} />
              <span className="nav-label-xps9">Cerrar sesión</span>
            </button>
          </nav>
        )}
      </div>
    </>
  );
};

export default SideBarCliente;
