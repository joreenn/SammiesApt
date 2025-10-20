import React, { useState } from "react";
import Dashboard from "./Dashboard.jsx";
import TenantManagement from "./TenantManagement.jsx";

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
      {currentPage === 'tenants' && <TenantManagement onNavigate={handleNavigate} />}
    </div>
  );
}
