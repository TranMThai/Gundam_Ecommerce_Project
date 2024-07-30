import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ProductCreate from '../pages/admin/productManager/create/ProductCreate'
import AdminLayout from '../layout/AdminLayout'
import ProductManager from '../pages/admin/productManager'

const AppRoutes = () => {
  return (
    <Routes>
      {/* public */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      {/* admin */}
      <Route element={<AdminLayout />}>
        <Route path='/admin/product' element={<ProductManager />} />
        <Route path='/admin/product/create' element={<ProductCreate />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes