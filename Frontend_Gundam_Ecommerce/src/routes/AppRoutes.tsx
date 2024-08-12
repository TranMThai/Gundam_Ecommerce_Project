import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ProductManager from '../pages/admin/productManager'
import CategoryManager from '../pages/admin/categoryManager'
import BrandManager from '../pages/admin/brandManager'
import Authenticate from '../components/Authenticate'
import Home from '../pages/user/Home'
import AdminLayout from '../layout/admin/AdminLayout'

const AppRoutes = () => {
  return (
    <Routes>
      {/* public */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/authenticate' element={<Authenticate />} />

      {/* user */}
      <Route path='/' element={<Home/>} />

      {/* admin */}
      <Route element={<AdminLayout />}>
        <Route path='/admin/product/*' element={<ProductManager />} />
        <Route path='/admin/category' element={<CategoryManager />} />
        <Route path='/admin/brand' element={<BrandManager />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes