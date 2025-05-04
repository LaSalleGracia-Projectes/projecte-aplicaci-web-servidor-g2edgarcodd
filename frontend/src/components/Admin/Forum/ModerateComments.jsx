import React, { useState } from "react";

const ModerateComments = () => {
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchComments = () => {
    setIsLoading(true);
    // Simulando una llamada a una API
    setTimeout(() => {
      const mockComments = [
        {
          id: 1,
          text: "Este es un comentario de ejemplo que podría requerir moderación.",
          author: "Usuario123",
          date: "2023-10-06",
          status: "pending",
          threadTitle: "Discusión sobre la nueva temporada",
        },
        {
          id: 2,
          text: "Este comentario contiene palabras que podrían ser inapropiadas.",
          author: "Cinefilo22",
          date: "2023-10-05",
          status: "flagged",
          threadTitle: "Reseñas de películas recientes",
        },
        {
          id: 3,
          text: "Comentario positivo sobre el contenido del foro.",
          author: "SeriesLover",
          date: "2023-10-04",
          status: "approved",
          threadTitle: "Debate sobre series de TV",
        },
      ];
      setComments(mockComments);
      setIsLoading(false);
    }, 1000);
  };

  const handleApprove = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, status: "approved" } : comment
      )
    );
  };

  const handleReject = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, status: "rejected" } : comment
      )
    );
  };

  const handleDelete = (commentId) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "approved":
        return "approved";
      case "flagged":
        return "flagged";
      case "rejected":
        return "flagged";
      default:
        return "pending";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "approved":
        return "Aprobado";
      case "flagged":
        return "Marcado";
      case "rejected":
        return "Rechazado";
      default:
        return "Pendiente";
    }
  };

  return (
    <div className="admin-forum-comments">
      <div className="admin-forum-comments-header">
        <h2 className="admin-forum-comments-title">
          <i className="fas fa-comment-alt"></i> Moderación de Comentarios
        </h2>
        <button
          className={`admin-button admin-button-primary ${
            isLoading ? "admin-button-loading" : ""
          }`}
          onClick={fetchComments}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="admin-loading-spinner"></span> Cargando...
            </>
          ) : (
            <>
              <i className="fas fa-sync-alt"></i> Cargar Comentarios
            </>
          )}
        </button>
      </div>

      {comments.length > 0 ? (
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className="admin-forum-comment">
              <div className="admin-forum-comment-header">
                <div className="admin-forum-comment-author">
                  <div className="admin-forum-comment-author-avatar">
                    {/* Avatar placeholder */}
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#e2e8f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <i
                        className="fas fa-user"
                        style={{ color: "#94a3b8" }}
                      ></i>
                    </div>
                  </div>
                  <div className="admin-forum-comment-author-info">
                    <p className="admin-forum-comment-author-name">
                      {comment.author}
                    </p>
                    <span className="admin-forum-comment-meta">
                      {comment.date}
                    </span>
                  </div>
                </div>
                <span
                  className={`admin-forum-comment-status ${getStatusClass(
                    comment.status
                  )}`}
                >
                  {getStatusText(comment.status)}
                </span>
              </div>

              <div className="admin-forum-comment-thread">
                <strong>En tema:</strong> {comment.threadTitle}
              </div>

              <p className="admin-forum-comment-content">{comment.text}</p>

              <div className="admin-forum-comment-actions">
                <button
                  className="admin-forum-comment-action approve"
                  onClick={() => handleApprove(comment.id)}
                  disabled={comment.status === "approved"}
                >
                  <i className="fas fa-check"></i> Aprobar
                </button>
                <button
                  className="admin-forum-comment-action delete"
                  onClick={() => handleReject(comment.id)}
                  disabled={comment.status === "rejected"}
                >
                  <i className="fas fa-ban"></i> Rechazar
                </button>
                <button
                  className="admin-forum-comment-action flag"
                  onClick={() => handleDelete(comment.id)}
                >
                  <i className="fas fa-trash"></i> Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="admin-empty-state">
          {isLoading ? (
            <div className="admin-loading">
              <span className="admin-loading-spinner large"></span>
              <p>Cargando comentarios...</p>
            </div>
          ) : (
            <>
              <i
                className="fas fa-comment-slash"
                style={{
                  fontSize: "2rem",
                  color: "#94a3b8",
                  marginBottom: "1rem",
                }}
              ></i>
              <p>No hay comentarios para moderar</p>
              <p className="admin-empty-state-subtitle">
                Haz clic en "Cargar Comentarios" para ver los comentarios que
                requieren moderación
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ModerateComments;
