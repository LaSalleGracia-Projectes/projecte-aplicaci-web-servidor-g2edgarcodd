import React, { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import TopicsList from "../components/Admin/Forum/TopicsList";
import ModerateComments from "../components/Admin/Forum/ModerateComments";
import "../styles/components/admin/variables.css";
import "../styles/components/admin/tables.css";
import "../styles/components/admin/forum.css";
import "../styles/components/admin/utilities.css";

const AdminForumPage = () => {
  const [activeTab, setActiveTab] = useState("topics");

  const forumStats = [
    {
      id: 1,
      icon: "comments",
      value: 256,
      label: "Total Temas",
      trend: "+12% vs. mes anterior",
    },
    {
      id: 2,
      icon: "reply-all",
      value: 1432,
      label: "Total Comentarios",
      trend: "+8% vs. mes anterior",
    },
    {
      id: 3,
      icon: "user-friends",
      value: 87,
      label: "Usuarios Activos",
      trend: "+5% vs. mes anterior",
    },
    {
      id: 4,
      icon: "flag",
      value: 8,
      label: "Reportes Pendientes",
      trend: "-3% vs. mes anterior",
    },
  ];

  return (
    <AdminLayout>
      <section className="admin-forum">
        <div className="admin-forum-header">
          <h1 className="admin-forum-title">Gestión del Foro</h1>
          <div className="admin-actions">
            <button className="admin-button admin-button-secondary">
              <i className="fas fa-cog"></i> Configuración
            </button>
            <button className="admin-button admin-button-primary">
              <i className="fas fa-plus"></i> Nueva Categoría
            </button>
          </div>
        </div>

        <div className="admin-forum-stats">
          {forumStats.map((stat) => (
            <div key={stat.id} className="admin-forum-stat-card">
              <div className="admin-forum-stat-icon">
                <i className={`fas fa-${stat.icon}`}></i>
              </div>
              <h3 className="admin-forum-stat-value">{stat.value}</h3>
              <p className="admin-forum-stat-label">{stat.label}</p>
              <div
                className={`admin-forum-stat-trend ${
                  stat.trend.startsWith("+") ? "up" : "down"
                }`}
              >
                <i
                  className={`fas fa-arrow-${
                    stat.trend.startsWith("+") ? "up" : "down"
                  }`}
                ></i>
                <span>{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === "topics" ? "active" : ""}`}
            onClick={() => setActiveTab("topics")}
          >
            <i className="fas fa-list-ul"></i> Temas
          </button>
          <button
            className={`admin-tab ${activeTab === "comments" ? "active" : ""}`}
            onClick={() => setActiveTab("comments")}
          >
            <i className="fas fa-comments"></i> Comentarios
          </button>
        </div>

        <div className="admin-tab-content">
          {activeTab === "topics" && <TopicsList />}
          {activeTab === "comments" && <ModerateComments />}
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminForumPage;
