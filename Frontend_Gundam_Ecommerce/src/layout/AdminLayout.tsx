import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import Sidebar from '../components/Sidebar';
import { ADMIN } from '../constants/Roles';
import { author } from '../services/AuthService';

const AdminLayout: React.FC = () => {
  const [collapse, setCollapse] = useState<boolean>(false)
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(window.matchMedia('(max-width: 1000px)').matches);

  const handleCollapse = () => setCollapse(!collapse)
  const handleToggled = () => {
    setToggled(!toggled),
      setCollapse(false)
  }

  if (author()!=ADMIN) {
    return <Navigate to="/login" />; 
  }

  return (
    <div className="d-flex">
      <Sidebar
        collapse={collapse}
        toggled={toggled}
        setToggled={setToggled}
        setBroken={setBroken}
      />
      <div className='w-100'>
        <AdminHeader
          handleCollapse={handleCollapse}
          handleToggled={handleToggled}
          broken={broken}
        />
        <main style={{ padding: '2em 0' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
