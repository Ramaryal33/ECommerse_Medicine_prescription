import { Routes, Route, useLocation } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import CartPage from './pages/CartPage';
import MedicinesPage from './pages/MedicinesPage';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Admin Pages
import AdminDashboard from './admin/AdminDashboard';
import MedicineManagement from './admin/MedicineManagement';
import CustomerManagement from './admin/CustomerManagement';
import OrderManagement from './admin/OrderManagement';

// User Pages
import UserDashboard from './user/UserDashboard';
import UserOrders from './user/UserOrders';
import UserNavbar from './components/UserNavbar';

function AppRoutes() {
  const location = useLocation();

  
  const isUser = location.pathname.startsWith('/user');

  // ✅ Only show main Navbar on home page
  const showMainNavbar = location.pathname === '/';

  return (
    <>
      {showMainNavbar && <Navbar />}
      {isUser && <UserNavbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/medicines" element={<MedicinesPage />} />

        {/* Protected User Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/user">
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="orders" element={<UserOrders />} />
            <Route path="cart" element={<CartPage />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="medicine" element={<MedicineManagement />} />
          <Route path="customers" element={<CustomerManagement />} />
          <Route path="orders" element={<OrderManagement />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
