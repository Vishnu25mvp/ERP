import React, { createContext, useContext, useState } from 'react';

const MultiTenantContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useMultiTenant = () => {
  const context = useContext(MultiTenantContext);
  if (!context) {
    throw new Error('useMultiTenant must be used within MultiTenantProvider');
  }
  return context;
};

export const MultiTenantProvider = ({ children }) => {
  const [companyId, setCompanyId] = useState(() => localStorage.getItem('companyId'));
  const [company, setCompany] = useState(() => {
    const stored = localStorage.getItem('company');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading] = useState(false);

  const switchCompany = (newCompanyId, newCompanyData) => {
    setCompanyId(newCompanyId);
    setCompany(newCompanyData);
    localStorage.setItem('companyId', newCompanyId);
    localStorage.setItem('company', JSON.stringify(newCompanyData));
  };

  const value = {
    company,
    companyId,
    loading,
    switchCompany,
    // Helper to add company_id to API requests
    addTenantToRequest: (config) => ({
      ...config,
      headers: {
        ...config.headers,
        'X-Company-ID': companyId,
      },
    }),
  };

  return (
    <MultiTenantContext.Provider value={value}>
      {children}
    </MultiTenantContext.Provider>
  );
};
