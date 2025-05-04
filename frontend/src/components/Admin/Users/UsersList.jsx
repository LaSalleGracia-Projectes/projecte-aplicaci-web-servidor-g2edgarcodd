import React, { useState } from "react";

const UsersList = () => {
  const users = [
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan@example.com",
      role: "admin",
      status: "active",
      avatar: null,
    },
    {
      id: 2,
      name: "María López",
      email: "maria@example.com",
      role: "editor",
      status: "active",
      avatar: null,
    },
    {
      id: 3,
      name: "Carlos García",
      email: "carlos@example.com",
      role: "user",
      status: "active",
      avatar: null,
    },
    {
      id: 4,
      name: "Ana Martínez",
      email: "ana@example.com",
      role: "moderator",
      status: "inactive",
      avatar: null,
    },
  ];

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filtrar usuarios por búsqueda y estado
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || user.role === filter;

    return matchesSearch && matchesFilter;
  });

  // Generar iniciales para avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();
  };

  return (
    <div className="admin-users-table-container">
      <div className="admin-users-header">
        <div className="admin-users-title">Usuarios</div>
        <div className="admin-users-actions">
          <button className="admin-users-action-btn primary">
            <i className="fas fa-plus"></i> Agregar Usuario
          </button>
          <button className="admin-users-action-btn secondary">
            <i className="fas fa-file-export"></i> Exportar
          </button>
        </div>
      </div>

      <div className="admin-users-filters">
        <div className="admin-users-search">
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={search}
            onChange={handleSearch}
          />
          <i className="fas fa-search"></i>
        </div>

        <div className="admin-users-filter-group">
          <label className="admin-users-filter-label">Rol</label>
          <select
            className="admin-users-filter-select"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="all">Todos</option>
            <option value="admin">Administradores</option>
            <option value="moderator">Moderadores</option>
            <option value="editor">Editores</option>
            <option value="user">Usuarios</option>
          </select>
        </div>
      </div>

      <table className="admin-users-table">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Fecha registro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="admin-users-table-user">
                  <div className="admin-users-table-avatar">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      getInitials(user.name)
                    )}
                  </div>
                  <div className="admin-users-table-user-info">
                    <div className="admin-users-table-name">{user.name}</div>
                    <div className="admin-users-table-email">{user.email}</div>
                  </div>
                </div>
              </td>
              <td>
                <div className={`admin-users-table-role ${user.role}`}>
                  {user.role === "admin" && "Administrador"}
                  {user.role === "moderator" && "Moderador"}
                  {user.role === "editor" && "Editor"}
                  {user.role === "user" && "Usuario"}
                </div>
              </td>
              <td>
                <div className={`admin-users-table-status ${user.status}`}>
                  {user.status === "active" && "Activo"}
                  {user.status === "inactive" && "Inactivo"}
                  {user.status === "pending" && "Pendiente"}
                  {user.status === "banned" && "Bloqueado"}
                </div>
              </td>
              <td>{new Date().toLocaleDateString("es-ES")}</td>
              <td>
                <div className="admin-users-table-actions">
                  <button
                    className="admin-users-table-action edit"
                    title="Editar"
                  >
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <button
                    className="admin-users-table-action view"
                    title="Ver detalles"
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button
                    className="admin-users-table-action delete"
                    title="Eliminar"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="admin-users-pagination">
        <button className="admin-users-page-button">
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="admin-users-page-button active">1</button>
        <button className="admin-users-page-button">2</button>
        <button className="admin-users-page-button">3</button>
        <button className="admin-users-page-button">
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default UsersList;
