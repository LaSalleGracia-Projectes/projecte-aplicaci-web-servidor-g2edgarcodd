import React, { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import MoviesList from "../components/Admin/Content/MoviesList";
import SeriesList from "../components/Admin/Content/SeriesList";
import "../styles/components/admin/variables.css";
import "../styles/components/admin/tables.css";
import "../styles/components/admin/content.css";
import "../styles/components/admin/utilities.css";

const AdminContentPage = () => {
  const [activeTab, setActiveTab] = useState("movies");

  return (
    <AdminLayout>
      <div className="admin-content-page">
        <div className="admin-content-header">
          <h1 className="admin-content-title">Gestión de Contenido</h1>
          <div className="admin-content-actions">
            <button className="admin-content-action-btn primary">
              <i className="fas fa-plus"></i> Añadir Contenido
            </button>
          </div>
        </div>

        <div className="admin-content-filters">
          <div className="admin-content-search">
            <i className="fas fa-search admin-content-search-icon"></i>
            <input
              type="text"
              className="admin-content-search-input"
              placeholder="Buscar contenido..."
            />
          </div>
          <div className="admin-content-filter-group">
            <span className="admin-content-filter-label">Filtrar por:</span>
            <select className="admin-content-filter-select">
              <option value="all">Todos los estados</option>
              <option value="published">Publicado</option>
              <option value="draft">Borrador</option>
              <option value="archived">Archivado</option>
            </select>
          </div>
          <div className="admin-content-filter-actions">
            <button className="admin-content-filter-btn reset">
              Reiniciar
            </button>
            <button className="admin-content-filter-btn apply">Aplicar</button>
          </div>
        </div>

        <div className="admin-content-tabs">
          <button
            className={`admin-content-tab ${
              activeTab === "movies" ? "active" : ""
            }`}
            onClick={() => setActiveTab("movies")}
          >
            <i className="fas fa-film"></i> Películas
          </button>
          <button
            className={`admin-content-tab ${
              activeTab === "series" ? "active" : ""
            }`}
            onClick={() => setActiveTab("series")}
          >
            <i className="fas fa-tv"></i> Series
          </button>
        </div>

        {activeTab === "movies" ? (
          <section className="admin-content-section">
            <h2 className="admin-content-section-title">
              <i className="fas fa-film"></i> Películas
            </h2>
            <MoviesList />
          </section>
        ) : (
          <section className="admin-content-section">
            <h2 className="admin-content-section-title">
              <i className="fas fa-tv"></i> Series
            </h2>
            <SeriesList />
          </section>
        )}

        <div className="admin-content-pagination">
          <button className="admin-content-page-button disabled">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="admin-content-page-button active">1</button>
          <button className="admin-content-page-button">2</button>
          <button className="admin-content-page-button">3</button>
          <button className="admin-content-page-button">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminContentPage;
