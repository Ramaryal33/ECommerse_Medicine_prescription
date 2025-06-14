import React, { useEffect, useState } from 'react';
import {
  GetAll as GetOrders,
  UpdateOrder // ✅ Correct import name
} from '../services/orderService';

import { GetAllUsers } from '../services/customerServices';
import AdminNavbar from '../components/AdminNavbar';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Fetch orders
        const { data: orderList } = await GetOrders();
        setOrders(orderList);

        // ✅ Fetch users
        const { data: users } = await GetAllUsers();
        const userMap = {};
        users.forEach(user => {
          userMap[user.id] = `${user.firstName} ${user.lastName}`;
        });
        setUsersMap(userMap);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateOrder = async (orderToUpdate) => {
    if (!newStatus) return;

    const updatedOrder = { ...orderToUpdate, orderStatus: newStatus };

    try {
      await UpdateOrder(orderToUpdate.id, updatedOrder);
      setOrders(prev =>
        prev.map((o) => (o.id === orderToUpdate.id ? { ...o, orderStatus: newStatus } : o))
      );
      setSuccessMessage('✅ Order status updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      setEditingOrderId(null);
    } catch (err) {
      console.error('Failed to update order:', err);
    }
  };

  const handleEdit = (order) => {
    setEditingOrderId(order.id);
    setNewStatus(order.orderStatus);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString('en-GB');
  };

  if (loading) return <div>Loading orders and users...</div>;
  if (orders.length === 0) return <div>No orders found.</div>;

  return (
    <>
      <AdminNavbar />
      <div className="container mt-4">
        <h2 className="text-center mb-4">All Orders</h2>

        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        <table className="table table-bordered">
          <thead className="table-dark text-center">
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Order No</th>
              <th>Total</th>
              <th>Status</th>
              <th>Order Date</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{usersMap[order.userId] || 'Unknown User'}</td>
                <td>{order.orderNumber}</td>
                <td>₹{order.orderTotal?.toFixed(2)}</td>
                <td>
                  {editingOrderId === order.id ? (
                    <select
                      className="form-select"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Completed">Completed</option>
                    </select>
                  ) : (
                    order.orderStatus
                  )}
                </td>
                <td>{formatDate(order.orderDate)}</td>
                <td>
                  {editingOrderId === order.id ? (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleUpdateOrder(order)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleEdit(order)}
                    >
                      Update
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderManagement;
