import React from "react";
import AdminLayout from "../layouts/AdminLayout";
import UsersList from "../components/Admin/Users/UsersList";
import UserForm from "../components/Admin/Users/UserForm";
import "../styles/components/admin/variables.css";
import "../styles/components/admin/tables.css";
import "../styles/components/admin/forms.css";
import "../styles/components/admin/users.css";
import "../styles/components/admin/utilities.css";

const AdminUsersPage = () => {
  return (
    <AdminLayout>
      <div className="admin-users-page">
        <h1>Gestión de Usuarios</h1>
        <UserForm />
        <UsersList />
      </div>
    </AdminLayout>
  );
};

export default AdminUsersPage;
