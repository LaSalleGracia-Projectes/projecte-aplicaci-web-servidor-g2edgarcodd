import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/components/admin/dashboard.css";

const QuickActions = () => {
  return (
    <div className="adminPanel-tasks-widget">
      <div className="adminPanel-tasks-header">
        <h2 className="adminPanel-tasks-title">
          <i className="fas fa-bolt"></i> Acciones Rápidas
        </h2>
      </div>
      <div className="adminPanel-quick-actions-grid">
        <Link to="/admin/users" className="adminPanel-quick-action">
          <div className="adminPanel-quick-action-icon">
            <i className="fas fa-users"></i>
          </div>
          <span className="adminPanel-quick-action-text">
            Gestionar Usuarios
          </span>
        </Link>
        <Link to="/admin/content/movies" className="adminPanel-quick-action">
          <div className="adminPanel-quick-action-icon">
            <i className="fas fa-film"></i>
          </div>
          <span className="adminPanel-quick-action-text">
            Gestionar Películas
          </span>
        </Link>
        <Link to="/admin/content/series" className="adminPanel-quick-action">
          <div className="adminPanel-quick-action-icon">
            <i className="fas fa-tv"></i>
          </div>
          <span className="adminPanel-quick-action-text">Gestionar Series</span>
        </Link>
        <Link to="/admin/blog/posts" className="adminPanel-quick-action">
          <div className="adminPanel-quick-action-icon">
            <i className="fas fa-pencil-alt"></i>
          </div>
          <span className="adminPanel-quick-action-text">
            Gestionar Publicaciones
          </span>
        </Link>
        <Link to="/admin/forum/topics" className="adminPanel-quick-action">
          <div className="adminPanel-quick-action-icon">
            <i className="fas fa-comments"></i>
          </div>
          <span className="adminPanel-quick-action-text">
            Moderación de Foro
          </span>
        </Link>
        <Link to="/admin/settings" className="adminPanel-quick-action">
          <div className="adminPanel-quick-action-icon">
            <i className="fas fa-cog"></i>
          </div>
          <span className="adminPanel-quick-action-text">Configuraciones</span>
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;
