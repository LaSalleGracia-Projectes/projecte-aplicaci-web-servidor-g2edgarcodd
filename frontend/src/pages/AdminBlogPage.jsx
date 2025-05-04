import React from "react";
import AdminLayout from "../layouts/AdminLayout";
import PostsList from "../components/Admin/Blog/PostsList";
import PostEditor from "../components/Admin/Blog/PostEditor";
import "../styles/components/admin/variables.css";
import "../styles/components/admin/tables.css";
import "../styles/components/admin/editor.css";
import "../styles/components/admin/utilities.css";

const AdminBlogPage = () => {
  return (
    <AdminLayout>
      <div className="admin-blog-page">
        <h1>Gestión del Blog</h1>
        <PostsList />
        <PostEditor />
      </div>
    </AdminLayout>
  );
};

export default AdminBlogPage;
