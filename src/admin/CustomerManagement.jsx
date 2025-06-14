// src/admin/CustomerManagement.jsx
import React, { useEffect, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import { GetAllUsers, UpdateUser } from '../services/customerServices';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    status: 'Active',
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await GetAllUsers();
      setCustomers(res.data);
    } catch (err) {
      console.error('Error loading customers', err);
    }
  };

  const handleEdit = (customer) => {
    setFormData({
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      status: customer.status || 'Active',
    });
    setEditingId(customer.id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await UpdateUser(editingId, formData);
      setMessage('✅ Customer updated successfully.');
      setTimeout(() => setMessage(''), 3000);
      setEditingId(null);
      setFormData({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        status: 'Active',
      });
      loadCustomers();
    } catch (err) {
      console.error('Error updating customer', err);
      setMessage('❌ Failed to update customer.');
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-4">
        <h3>Customer Management</h3>

        {message && <div className="alert alert-info">{message}</div>}

        {editingId && (
          <form onSubmit={handleFormSubmit} className="mb-4">
            <div className="row g-3">
              <div className="col-md-3">
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-3">
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-2">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Update Customer
            </button>
          </form>
        )}

        <h4>Customer List</h4>
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, index) => (
              <tr key={c.id}>
                <td>{index + 1}</td>
                <td>{c.firstName}</td>
                <td>{c.lastName}</td>
                <td>{c.email}</td>
                <td>{c.status}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleEdit(c)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CustomerManagement;
