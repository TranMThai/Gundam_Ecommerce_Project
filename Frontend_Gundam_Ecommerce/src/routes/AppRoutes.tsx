import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ProductCreate from '../pages/admin/productManager/create/ProductCreate'

const AppRoutes = () => {
  return (
    <Routes>
      {/* public */}
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>

      {/* admin */}
      <Route path='/admin/product/create' element={<ProductCreate />} />
    </Routes>
  )
}

export default AppRoutes