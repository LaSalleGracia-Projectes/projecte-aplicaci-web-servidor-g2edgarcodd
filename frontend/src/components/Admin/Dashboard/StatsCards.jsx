import React from "react";
import AdminCard from "../../UI/AdminCard";
import "../../../styles/components/admin/cards.css";

const StatsCards = () => {
  const stats = [
    {
      title: "Usuarios Registrados",
      value: 1200,
      icon: "fas fa-users",
      trend: "+5%",
      trendType: "up",
    },
    {
      title: "Publicaciones en el Blog",
      value: 300,
      icon: "fas fa-blog",
      trend: "+12%",
      trendType: "up",
    },
    {
      title: "Comentarios Moderados",
      value: 1500,
      icon: "fas fa-comments",
      trend: "+8%",
      trendType: "up",
    },
    {
      title: "Películas Disponibles",
      value: 200,
      icon: "fas fa-film",
      trend: "+3%",
      trendType: "up",
    },
    {
      title: "Series Disponibles",
      value: 100,
      icon: "fas fa-tv",
      trend: "-2%",
      trendType: "down",
    },
  ];

  return (
    <div className="adminPanel-realtime-widget">
      <div className="adminPanel-realtime-header">
        <h2 className="adminPanel-realtime-title">
          <i className="fas fa-chart-line"></i> Estadísticas en Tiempo Real
        </h2>
        <button className="adminPanel-realtime-refresh">
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>
      <div className="adminPanel-realtime-grid">
        {stats.map((stat, index) => (
          <AdminCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            trendType={stat.trendType}
          />
        ))}
      </div>
    </div>
  );
};

export default StatsCards;
