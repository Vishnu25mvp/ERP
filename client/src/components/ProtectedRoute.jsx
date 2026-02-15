import React from 'react';
import { useIAM } from '../context/IAMContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ 
  component: Component, 
  requiredRole, 
  requiredPermission,
  ...rest 
}) => {
  const { user, loading, hasPermission, hasRole } = useIAM();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/unauthorized" />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" />;
  }

  return Component ? <Component {...rest} /> : null;
};

export const PermissionGate = ({ 
  permission, 
  children, 
  fallback = null 
}) => {
  const { hasPermission } = useIAM();

  if (!hasPermission(permission)) {
    return fallback;
  }

  return children;
};

export const RoleGate = ({ 
  role, 
  children, 
  fallback = null 
}) => {
  const { hasRole } = useIAM();

  if (!hasRole(role)) {
    return fallback;
  }

  return children;
};
