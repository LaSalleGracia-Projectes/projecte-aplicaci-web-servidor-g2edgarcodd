import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/components/admin/variables.css";
import "../../styles/components/admin/layout.css";

const AdminSidebar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Función para determinar si un enlace está activo
  const isActive = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      <button
        className="adminPanel-mobile-toggle"
        onClick={toggleMobileMenu}
        style={{ display: "none" }} // Se mostrará solo en móviles via CSS
      >
        <i className="fas fa-bars"></i>
      </button>

      <aside className={`adminPanel-sidebar ${isMobileOpen ? "open" : ""}`}>
        <div className="adminPanel-sidebar-header">
          <h2 className="adminPanel-sidebar-title">StreamHub</h2>
        </div>

        <nav className="adminPanel-sidebar-nav">
          <div className="adminPanel-nav-group">
            <div className="adminPanel-nav-group-title">Principal</div>
            <ul>
              <li>
                <Link
                  to="/admin/dashboard"
                  className={isActive("/admin/dashboard") ? "active" : ""}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <i className="fas fa-tachometer-alt"></i>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/users"
                  className={isActive("/admin/users") ? "active" : ""}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <i className="fas fa-users"></i>
                  Usuarios
                  <span className="adminPanel-nav-badge">24</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="adminPanel-nav-group">
            <div className="adminPanel-nav-group-title">Contenido</div>
            <ul>
              <li>
                <Link
                  to="/admin/content"
                  className={isActive("/admin/content") ? "active" : ""}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <i className="fas fa-film"></i>
                  Películas y Series
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/blog"
                  className={isActive("/admin/blog") ? "active" : ""}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <i className="fas fa-blog"></i>
                  Blog
                  <span className="adminPanel-nav-badge new">Nuevo</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/forum"
                  className={isActive("/admin/forum") ? "active" : ""}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <i className="fas fa-comments"></i>
                  Foro
                  <span className="adminPanel-nav-badge alert">3</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="adminPanel-nav-group">
            <div className="adminPanel-nav-group-title">Sistema</div>
            <ul>
              <li>
                <Link
                  to="/admin/settings"
                  className={isActive("/admin/settings") ? "active" : ""}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <i className="fas fa-cog"></i>
                  Configuraciones
                </Link>
              </li>
              <li>
                <Link to="/logout" className="adminPanel-nav-logout">
                  <i className="fas fa-sign-out-alt"></i>
                  Cerrar Sesión
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="adminPanel-sidebar-footer">
          <div className="adminPanel-user-info">
            <div className="adminPanel-user-avatar">
              <i className="fas fa-user"></i>
            </div>
            <div className="adminPanel-user-details">
              <div className="adminPanel-user-name">Administrador</div>
              <div className="adminPanel-user-role">Admin</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
