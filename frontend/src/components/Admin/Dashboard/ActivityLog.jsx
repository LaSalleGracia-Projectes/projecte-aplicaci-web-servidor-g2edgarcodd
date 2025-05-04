import React from "react";
import "../../../styles/components/admin/activity.css";

const ActivityLog = () => {
  const activities = [
    {
      id: 1,
      action: "Usuario creado",
      timestamp: "2023-10-01 10:00",
      user: "admin@streamhub.com",
      status: "success",
    },
    {
      id: 2,
      action: "Publicación editada",
      timestamp: "2023-10-01 11:30",
      user: "editor@streamhub.com",
      status: "info",
    },
    {
      id: 3,
      action: "Comentario moderado",
      timestamp: "2023-10-01 12:15",
      user: "moderador@streamhub.com",
      status: "warning",
    },
    {
      id: 4,
      action: "Usuario eliminado",
      timestamp: "2023-10-01 13:45",
      user: "admin@streamhub.com",
      status: "danger",
    },
    {
      id: 5,
      action: "Configuración actualizada",
      timestamp: "2023-10-01 14:00",
      user: "admin@streamhub.com",
      status: "success",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return "fa-check-circle";
      case "info":
        return "fa-info-circle";
      case "warning":
        return "fa-exclamation-triangle";
      case "danger":
        return "fa-times-circle";
      default:
        return "fa-check-circle";
    }
  };

  return (
    <div className="adminPanel-tasks-widget">
      <div className="adminPanel-tasks-header">
        <h2 className="adminPanel-tasks-title">
          <i className="fas fa-history"></i> Registro de Actividades
        </h2>
      </div>
      <ul className="adminPanel-activity-list">
        {activities.map((activity) => (
          <li
            key={activity.id}
            className={`adminPanel-activity-item status-${activity.status}`}
          >
            <div
              className={`adminPanel-activity-icon status-${activity.status}`}
            >
              <i className={`fas ${getStatusIcon(activity.status)}`}></i>
            </div>
            <div className="adminPanel-activity-content">
              <div className="adminPanel-activity-action">
                {activity.action}
              </div>
              <div className="adminPanel-activity-details">
                <span className="adminPanel-activity-user">
                  <i className="fas fa-user"></i> {activity.user}
                </span>
                <span className="adminPanel-activity-timestamp">
                  <i className="fas fa-clock"></i> {activity.timestamp}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="adminPanel-activity-more">
        <button className="adminPanel-activity-more-btn">
          Ver todas las actividades <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default ActivityLog;
