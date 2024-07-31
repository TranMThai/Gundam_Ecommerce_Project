import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import Sidebar from '../components/Sidebar';

const AdminLayout: React.FC = () => {
  const [collapse, setCollapse] = useState<boolean>(false)
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(window.matchMedia('(max-width: 1000px)').matches);

  const handleCollapse = () => setCollapse(!collapse)
  const handleToggled = () => {
    setToggled(!toggled),
    setCollapse(false)
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
