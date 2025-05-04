import React, { useState } from "react";

const MoviesList = () => {
  // Simulación de datos de películas
  const movies = [
    {
      id: 1,
      title: "Inception",
      year: 2010,
      director: "Christopher Nolan",
      status: "published",
      thumbnail:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    },
    {
      id: 2,
      title: "Interstellar",
      year: 2014,
      director: "Christopher Nolan",
      status: "published",
      thumbnail:
        "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    },
    {
      id: 3,
      title: "The Dark Knight",
      year: 2008,
      director: "Christopher Nolan",
      status: "draft",
      thumbnail:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    },
    {
      id: 4,
      title: "Pulp Fiction",
      year: 1994,
      director: "Quentin Tarantino",
      status: "published",
      thumbnail:
        "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    },
    {
      id: 5,
      title: "The Shawshank Redemption",
      year: 1994,
      director: "Frank Darabont",
      status: "archived",
      thumbnail:
        "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
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
          {movies.map((movie) => (
            <div className="admin-content-card" key={movie.id}>
              <div className="admin-content-card-img-container">
                <img
                  src={movie.thumbnail}
                  alt={movie.title}
                  className="admin-content-card-img"
                />
                <span className="admin-content-card-badge movie">Película</span>
              </div>
              <div className="admin-content-card-body">
                <h3 className="admin-content-card-title">{movie.title}</h3>
                <div className="admin-content-card-meta">
                  <div className="admin-content-card-meta-item">
                    <i className="fas fa-calendar"></i> {movie.year}
                  </div>
                  <div className="admin-content-card-meta-item">
                    <i className="fas fa-user"></i> {movie.director}
                  </div>
                </div>
                <div className="admin-content-card-footer">
                  <div className={`admin-content-card-status ${movie.status}`}>
                    <i
                      className={`fas ${
                        movie.status === "published"
                          ? "fa-check-circle"
                          : movie.status === "draft"
                          ? "fa-clock"
                          : "fa-archive"
                      }`}
                    ></i>
                    {movie.status === "published"
                      ? "Publicado"
                      : movie.status === "draft"
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
                <th>Película</th>
                <th>Año</th>
                <th>Director</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id}>
                  <td>
                    <div className="admin-content-table-media">
                      <div className="admin-content-table-thumbnail">
                        <img src={movie.thumbnail} alt={movie.title} />
                      </div>
                      <span className="admin-content-table-title">
                        {movie.title}
                      </span>
                    </div>
                  </td>
                  <td>{movie.year}</td>
                  <td>{movie.director}</td>
                  <td>
                    <span
                      className={`admin-content-table-status ${movie.status}`}
                    >
                      {movie.status === "published"
                        ? "Publicado"
                        : movie.status === "draft"
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

export default MoviesList;
