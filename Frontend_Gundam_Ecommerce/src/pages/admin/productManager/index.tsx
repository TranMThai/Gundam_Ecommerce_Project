import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import ProductList from './list/ProductList'
import ProductCreate from './create/ProductCreate'
import ProductDetail from './detail/ProductDetail'

const ProductManager: React.FC = () => {

    return (
        <>
            <Routes>
                <Route path='' element={<ProductList />} />
                <Route path='/:id' element={<ProductDetail />} />
                <Route path='/create' element={<ProductCreate />} />
            </Routes>
            <Outlet />
        </>
    )
}

export default ProductManager
