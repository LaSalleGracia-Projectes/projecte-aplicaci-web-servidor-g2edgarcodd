import React from "react";
import AdminLayout from "../layouts/AdminLayout";
import GeneralSettings from "../components/Admin/Settings/GeneralSettings";
import AppearanceSettings from "../components/Admin/Settings/AppearanceSettings";
import "../styles/components/admin/forms.css";
import "../styles/components/admin/settings.css";

const AdminSettingsPage = () => {
  return (
    <AdminLayout>
      <section className="admin-settings-page">
        <h1 className="admin-settings-title">
          Configuraciones del Administrador
        </h1>
        <p className="admin-settings-subtitle">
          Gestiona todas las configuraciones y preferencias de tu plataforma
          desde este panel.
        </p>

        <div className="settings-section">
          <div className="settings-header">
            <h2 className="settings-title">
              <i className="fas fa-cog"></i> Configuraciones Generales
            </h2>
          </div>
          <div className="settings-content">
            <GeneralSettings />
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-header">
            <h2 className="settings-title">
              <i className="fas fa-palette"></i> Configuración de Apariencia
            </h2>
          </div>
          <div className="settings-content">
            <AppearanceSettings />
          </div>
        </div>

        <div className="settings-actions">
          <button className="settings-action-btn secondary">Cancelar</button>
          <button className="settings-action-btn primary">
            Guardar Cambios
          </button>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
