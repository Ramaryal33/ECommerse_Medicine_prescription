import React, { useEffect, useState } from 'react';
import { GetAll as GetOrders } from '../services/orderService';


const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('User'));
        if (!storedUser?.id) {
          alert('User not found.');
          return;
        }

        const ordersResponse = await GetOrders();
        const filteredOrders = ordersResponse.data.filter(
          (order) =>
            order.userId === storedUser.id &&
            order.orderStatus === 'Pending'
        );

        setOrders(filteredOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        alert('Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString('en-GB');
  };

  return (
    <>
    
      <div className="container mt-4">
        <h2 className="mb-4">Pending Orders</h2>

        {loading ? (
          <div>Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="alert alert-info">No pending orders found.</div>
        ) : (
          <table className="table table-bordered text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Order No</th>
                <th>Total</th>
                <th>Status</th>
                <th>Order Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td>{order.orderNumber}</td>
                  <td>₹{order.orderTotal?.toFixed(2)}</td>
                  <td>{order.orderStatus}</td>
                  <td>{formatDate(order.orderDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default UserOrders;
