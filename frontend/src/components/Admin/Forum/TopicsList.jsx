import React, { useState } from "react";

const TopicsList = () => {
  const [topics, setTopics] = useState([
    {
      id: 1,
      title: "Tema 1",
      posts: 10,
      lastPost: "2023-10-01",
      status: "active",
    },
    {
      id: 2,
      title: "Tema 2",
      posts: 5,
      lastPost: "2023-09-28",
      status: "locked",
    },
    {
      id: 3,
      title: "Tema 3",
      posts: 8,
      lastPost: "2023-09-25",
      status: "pinned",
    },
    {
      id: 4,
      title: "Tema 4",
      posts: 12,
      lastPost: "2023-10-05",
      status: "active",
    },
  ]);

  const getStatusClass = (status) => {
    switch (status) {
      case "pinned":
        return "pinned";
      case "locked":
        return "locked";
      default:
        return "normal";
    }
  };

  const handleDelete = (id) => {
    setTopics(topics.filter((topic) => topic.id !== id));
  };

  return (
    <div className="admin-forum-threads">
      <div className="admin-forum-threads-header">
        <h2 className="admin-forum-threads-title">
          <i className="fas fa-comments"></i> Lista de Temas del Foro
        </h2>
        <button className="admin-button admin-button-primary">
          <i className="fas fa-plus"></i> Nuevo Tema
        </button>
      </div>

      <table className="admin-forum-threads-table">
        <thead>
          <tr>
            <th>Estado</th>
            <th>Título</th>
            <th>Publicaciones</th>
            <th>Última Publicación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {topics.map((topic) => (
            <tr key={topic.id}>
              <td>
                <div
                  className={`admin-forum-thread-status ${getStatusClass(
                    topic.status
                  )}`}
                ></div>
              </td>
              <td>
                <div className="admin-forum-thread-cell">
                  <div>
                    <h4 className="admin-forum-thread-title">{topic.title}</h4>
                    <span className="admin-forum-thread-meta">
                      {topic.status === "locked" && <span>(Bloqueado)</span>}
                      {topic.status === "pinned" && <span>(Destacado)</span>}
                    </span>
                  </div>
                </div>
              </td>
              <td>{topic.posts}</td>
              <td>{topic.lastPost}</td>
              <td>
                <div className="admin-forum-thread-options">
                  <button
                    className="admin-forum-thread-option view"
                    title="Ver"
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button
                    className="admin-forum-thread-option edit"
                    title="Editar"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="admin-forum-thread-option delete"
                    title="Eliminar"
                    onClick={() => handleDelete(topic.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {topics.length === 0 && (
        <div className="admin-empty-state">
          <p>No hay temas disponibles</p>
        </div>
      )}
    </div>
  );
};

export default TopicsList;
