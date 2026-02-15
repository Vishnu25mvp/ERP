import React, { createContext, useContext, useState } from 'react';
import { ROLES, PERMISSIONS, ROLE_PERMISSIONS_MAP } from './IAMConstants';

const IAMContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useIAM = () => {
  const context = useContext(IAMContext);
  if (!context) {
    throw new Error('useIAM must be used within IAMProvider');
  }
  return context;
};

export { ROLES, PERMISSIONS };

export const IAMProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });
  const [loading] = useState(false);

  // Check if user has permission
  const hasPermission = (permission) => {
    if (!user) return false;
    if (user.role === ROLES.ADMIN) return true;

    const userPermissions = ROLE_PERMISSIONS_MAP[user.role] || [];
    return userPermissions.includes(permission) || userPermissions.includes('*');
  };

  // Check if user has any of multiple permissions
  const hasAnyPermission = (permissions) => {
    return permissions.some(permission => hasPermission(permission));
  };

  // Check if user has all of multiple permissions
  const hasAllPermissions = (permissions) => {
    return permissions.every(permission => hasPermission(permission));
  };

  // Check if user has role
  const hasRole = (role) => {
    if (!user) return false;
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  };

  const setUserData = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    setUserData,
    logout,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    ROLES,
    PERMISSIONS,
  };

  return (
    <IAMContext.Provider value={value}>
      {children}
    </IAMContext.Provider>
  );
};
