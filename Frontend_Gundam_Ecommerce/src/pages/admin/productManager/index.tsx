import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import ProductList from './ProductList'
import ProductDetail from './ProductDetail'
import ProductCreate from './ProductCreate'
import ProductUpdate from './ProductUpdate'

const ProductManager: React.FC = () => {

    return (
        <>
            <Routes>
                <Route path='' element={<ProductList />} />
                <Route path='/:id' element={<ProductDetail />} />
                <Route path='/create' element={<ProductCreate />} />
                <Route path='/update/:id' element={<ProductUpdate />} />
            </Routes>
            <Outlet />
        </>
    )
}

export default ProductManager
