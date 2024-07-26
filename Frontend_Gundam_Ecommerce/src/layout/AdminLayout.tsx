import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';

const AdminLayout: React.FC = () => {

  return (
    <div className="d-flex">
      <Sidebar />
      <div style={{padding: '2em 3em'}}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
