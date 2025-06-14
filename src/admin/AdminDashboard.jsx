import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar'; // Ensure this path is correct

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <AdminNavbar />
      <div className="container mt-5">
        <h2 className="mb-4">Welcome, Admin</h2>
        <p className="mb-4">Manage users, medicines, and orders efficiently from this dashboard.</p>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm h-100 cursor-pointer">
              <div className="card-body">
                <h5 className="card-title">🧪 Manage Medicines</h5>
                <p className="card-text">Add, edit, or remove available medicines.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="card shadow-sm h-100 cursor-pointer"
              onClick={() => navigate('/admin/customers')}
            >
              <div className="card-body">
                <h5 className="card-title">👥 Manage Customers</h5>
                <p className="card-text">View and manage registered users.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="card shadow-sm h-100 cursor-pointer"
              onClick={() => navigate('/admin/orders')}
            >
              <div className="card-body">
                <h5 className="card-title">📦 Manage Orders</h5>
                <p className="card-text">Track and update customer orders.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
