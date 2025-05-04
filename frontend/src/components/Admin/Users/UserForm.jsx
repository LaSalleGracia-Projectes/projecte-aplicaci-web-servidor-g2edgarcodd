import React, { useState } from "react";

const UserForm = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    role: user ? user.role : "user",
    status: user ? user.status : "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del usuario enviados:", formData);
    // Aquí iría la lógica para enviar los datos al servidor
  };

  return (
    <div className="admin-users-form">
      <div className="admin-users-form-header">
        <h3 className="admin-users-form-title">
          <i className="fas fa-user-plus"></i>{" "}
          {user ? "Editar Usuario" : "Crear Nuevo Usuario"}
        </h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="admin-users-form-section">
          <h4 className="admin-users-form-section-title">Información Básica</h4>

          <div className="admin-users-form-row">
            <div className="admin-users-form-group">
              <label className="admin-users-form-label" htmlFor="name">
                Nombre Completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="admin-users-form-input"
                value={formData.name}
                onChange={handleChange}
                placeholder="Escriba el nombre completo"
                required
              />
            </div>

            <div className="admin-users-form-group">
              <label className="admin-users-form-label" htmlFor="email">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="admin-users-form-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                required
              />
            </div>
          </div>

          <div className="admin-users-form-row">
            <div className="admin-users-form-group">
              <label className="admin-users-form-label" htmlFor="role">
                Rol
              </label>
              <select
                id="role"
                name="role"
                className="admin-users-form-select"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
                <option value="editor">Editor</option>
                <option value="moderator">Moderador</option>
              </select>
              <span className="admin-users-form-help">
                El rol determina los permisos del usuario en el sistema
              </span>
            </div>

            <div className="admin-users-form-group">
              <label className="admin-users-form-label" htmlFor="status">
                Estado
              </label>
              <select
                id="status"
                name="status"
                className="admin-users-form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
                <option value="pending">Pendiente</option>
                <option value="banned">Bloqueado</option>
              </select>
            </div>
          </div>
        </div>

        <div className="admin-users-form-actions">
          <button
            type="button"
            className="admin-users-form-button secondary"
            onClick={() => console.log("Formulario cancelado")}
          >
            <i className="fas fa-times"></i> Cancelar
          </button>
          <button type="submit" className="admin-users-form-button primary">
            <i className="fas fa-save"></i>{" "}
            {user ? "Actualizar Usuario" : "Crear Usuario"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
