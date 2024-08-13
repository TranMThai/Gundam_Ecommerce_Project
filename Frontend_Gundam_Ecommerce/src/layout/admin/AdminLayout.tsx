import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import { userPayloadSelector } from '../../redux/reducer/UserPayloadReducer';
import { ADMIN } from '../../constants/Roles';
import Sidebar from './AdminSidebar';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate()
  const user = useSelector(userPayloadSelector)
  const [collapse, setCollapse] = useState<boolean>(false)
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(window.matchMedia('(max-width: 1000px)').matches);

  const handleCollapse = () => setCollapse(!collapse)
  const handleToggled = () => {
    setToggled(!toggled),
      setCollapse(false)
  }

  useEffect(() => {
    if (user?.scope !== ADMIN)
      navigate("/login")
  }, [user])

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
