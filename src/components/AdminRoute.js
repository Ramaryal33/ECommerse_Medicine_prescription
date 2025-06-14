import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAdmin } from '../utils/auth';

const AdminRoute = () => {
  const [authorized, setAuthorized] = useState(null); // null = loading, false = no access, true = admin

  useEffect(() => {
    const checkAuth = () => {
      const isUserAdmin = isAdmin();
      setAuthorized(isUserAdmin);
    };
    checkAuth();
  }, []);

  if (authorized === null) {
    return <div className="text-center mt-5">Checking access...</div>;
  }

  return authorized ? (
    <Outlet /> // No navbar here
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoute;
