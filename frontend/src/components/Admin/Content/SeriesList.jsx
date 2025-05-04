import React, { useState } from "react";

const SeriesList = () => {
  // Simulación de datos de series
  const series = [
    {
      id: 1,
      title: "Breaking Bad",
      seasons: 5,
      year: 2008,
      creator: "Vince Gilligan",
      status: "published",
      thumbnail:
        "https://m.media-amazon.com/images/M/MV5BNDkyZThhNmMtZDBjYS00NDBmLTlkMjgtNWM2ZWYzZDQxZWU1XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg",
    },
    {
      id: 2,
      title: "Game of Thrones",
      seasons: 8,
      year: 2011,
      creator: "David Benioff, D. B. Weiss",
      status: "published",
      thumbnail:
        "https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
    },
    {
      id: 3,
      title: "Stranger Things",
      seasons: 4,
      year: 2016,
      creator: "The Duffer Brothers",
      status: "draft",
      thumbnail:
        "https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3MjYtZGMzZWI1ZjhlOWJmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    },
    {
      id: 4,
      title: "The Crown",
      seasons: 5,
      year: 2016,
      creator: "Peter Morgan",
      status: "published",
      thumbnail:
        "https://m.media-amazon.com/images/M/MV5BNGI1ODgyNjUtMzZkMy00OWNiLWE0ZjUtMzNkZmZkNzUxZmFiXkEyXkFqcGdeQXVyNjkwNzEwMzU@._V1_.jpg",
    },
    {
      id: 5,
      title: "Dark",
      seasons: 3,
      year: 2017,
      creator: "Baran bo Odar, Jantje Friese",
      status: "archived",
      thumbnail:
        "https://m.media-amazon.com/images/M/MV5BOTk2NzUyOTctZDdlMS00MDJlLTgzNTEtNzQzYjFhNjA0YjBjXkEyXkFqcGdeQXVyMjg1NDcxNDE@._V1_.jpg",
    },
  ];

  const [showGrid, setShowGrid] = useState(true);

  return (
    <div className="admin-content-container">
      <div className="admin-content-actions" style={{ marginBottom: "1rem" }}>
        <button
          className={`admin-content-filter-btn ${showGrid ? "active" : ""}`}
          onClick={() => setShowGrid(true)}
        >
          <i className="fas fa-th"></i> Vista de Cuadrícula
        </button>
        <button
          className={`admin-content-filter-btn ${!showGrid ? "active" : ""}`}
          onClick={() => setShowGrid(false)}
        >
          <i className="fas fa-list"></i> Vista de Tabla
        </button>
      </div>

      {showGrid ? (
        <div className="admin-content-grid">
          {series.map((serie) => (
            <div className="admin-content-card" key={serie.id}>
              <div className="admin-content-card-img-container">
                <img
                  src={serie.thumbnail}
                  alt={serie.title}
                  className="admin-content-card-img"
                />
                <span className="admin-content-card-badge series">Serie</span>
              </div>
              <div className="admin-content-card-body">
                <h3 className="admin-content-card-title">{serie.title}</h3>
                <div className="admin-content-card-meta">
                  <div className="admin-content-card-meta-item">
                    <i className="fas fa-calendar"></i> {serie.year}
                  </div>
                  <div className="admin-content-card-meta-item">
                    <i className="fas fa-film"></i> {serie.seasons} temporadas
                  </div>
                </div>
                <div className="admin-content-card-meta">
                  <div className="admin-content-card-meta-item">
                    <i className="fas fa-user"></i> {serie.creator}
                  </div>
                </div>
                <div className="admin-content-card-footer">
                  <div className={`admin-content-card-status ${serie.status}`}>
                    <i
                      className={`fas ${
                        serie.status === "published"
                          ? "fa-check-circle"
                          : serie.status === "draft"
                          ? "fa-clock"
                          : "fa-archive"
                      }`}
                    ></i>
                    {serie.status === "published"
                      ? "Publicado"
                      : serie.status === "draft"
                      ? "Borrador"
                      : "Archivado"}
                  </div>
                  <div className="admin-content-card-actions">
                    <button
                      className="admin-content-card-action edit"
                      title="Editar"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="admin-content-card-action view"
                      title="Ver"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button
                      className="admin-content-card-action delete"
                      title="Eliminar"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="admin-content-table-container">
          <table className="admin-content-table">
            <thead>
              <tr>
                <th>Serie</th>
                <th>Año</th>
                <th>Temporadas</th>
                <th>Creador</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {series.map((serie) => (
                <tr key={serie.id}>
                  <td>
                    <div className="admin-content-table-media">
                      <div className="admin-content-table-thumbnail">
                        <img src={serie.thumbnail} alt={serie.title} />
                      </div>
                      <span className="admin-content-table-title">
                        {serie.title}
                      </span>
                    </div>
                  </td>
                  <td>{serie.year}</td>
                  <td>{serie.seasons}</td>
                  <td>{serie.creator}</td>
                  <td>
                    <span
                      className={`admin-content-table-status ${serie.status}`}
                    >
                      {serie.status === "published"
                        ? "Publicado"
                        : serie.status === "draft"
                        ? "Borrador"
                        : "Archivado"}
                    </span>
                  </td>
                  <td>
                    <div className="admin-content-table-actions">
                      <button
                        className="admin-content-table-action edit"
                        title="Editar"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="admin-content-table-action view"
                        title="Ver"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        className="admin-content-table-action delete"
                        title="Eliminar"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SeriesList;
