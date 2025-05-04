import React, { useState, useEffect } from "react";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de una llamada a la API para obtener publicaciones
    const fetchPosts = async () => {
      try {
        // Simulando carga de datos
        setLoading(true);
        // Aquí se debería realizar la llamada a la API
        // const response = await fetch('/api/posts');
        // const data = await response.json();

        // Datos de ejemplo mientras no hay API
        setTimeout(() => {
          const mockData = [
            {
              id: 1,
              title: "Las 10 mejores series de 2025",
              author: "Admin",
              publishDate: "2025-04-15",
              status: "published",
            },
            {
              id: 2,
              title: "Estrenos imperdibles de mayo",
              author: "Editor",
              publishDate: "2025-04-28",
              status: "published",
            },
            {
              id: 3,
              title: "Análisis: La nueva temporada de Stranger Things",
              author: "Admin",
              publishDate: "2025-04-10",
              status: "draft",
            },
            {
              id: 4,
              title: 'Entrevista exclusiva con director de "The Last of Us"',
              author: "Editor",
              publishDate: "2025-03-22",
              status: "published",
            },
            {
              id: 5,
              title: "Los documentales más valorados",
              author: "Admin",
              publishDate: "2025-03-15",
              status: "draft",
            },
          ];
          setPosts(mockData);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error al cargar las publicaciones:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = (postId) => {
    // Lógica para eliminar una publicación
    // Aquí se debería realizar la llamada a la API para eliminar la publicación
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "published":
        return "adminPanel-table .status-badge active";
      case "draft":
        return "adminPanel-table .status-badge draft";
      case "pending":
        return "adminPanel-table .status-badge pending";
      default:
        return "adminPanel-table .status-badge";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "published":
        return "Publicado";
      case "draft":
        return "Borrador";
      case "pending":
        return "Pendiente";
      default:
        return status;
    }
  };

  return (
    <div className="adminPanel-table-container">
      <div className="adminPanel-table-header">
        <h2 className="adminPanel-table-title">Lista de Publicaciones</h2>
        <div className="adminPanel-table-actions">
          <button className="adminPanel-btn adminPanel-btn-primary">
            <i className="fas fa-plus"></i> Nueva Publicación
          </button>
        </div>
      </div>

      {loading ? (
        <div className="adminPanel-loader">
          <div className="adminPanel-spinner"></div>
          <p className="adminPanel-loader-text">Cargando publicaciones...</p>
        </div>
      ) : (
        <div className="adminPanel-table-responsive">
          <table className="adminPanel-table">
            <thead>
              <tr>
                <th className="sortable">Título</th>
                <th>Autor</th>
                <th>Fecha de Publicación</th>
                <th>Estado</th>
                <th className="actions">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id}>
                    <td className="highlight">{post.title}</td>
                    <td>{post.author}</td>
                    <td>{new Date(post.publishDate).toLocaleDateString()}</td>
                    <td>
                      <span className={getStatusBadgeClass(post.status)}>
                        {getStatusText(post.status)}
                      </span>
                    </td>
                    <td className="actions">
                      <div className="adminPanel-table-actions">
                        <button className="action-btn view" title="Ver">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="action-btn edit" title="Editar">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => handleDelete(post.id)}
                          title="Eliminar"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="adminPanel-table-empty">
                    <div className="adminPanel-table-empty">
                      <div className="adminPanel-table-empty-icon">📝</div>
                      <p className="adminPanel-table-empty-message">
                        No hay publicaciones disponibles
                      </p>
                      <p className="adminPanel-table-empty-help">
                        Cree una nueva publicación para empezar
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="adminPanel-table-pagination">
            <div className="adminPanel-pagination-info">
              Mostrando <b>5</b> de <b>5</b> publicaciones
            </div>
            <div className="adminPanel-pagination-controls">
              <button className="adminPanel-pagination-btn" disabled>
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="adminPanel-pagination-btn active">1</button>
              <button className="adminPanel-pagination-btn disabled" disabled>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsList;
