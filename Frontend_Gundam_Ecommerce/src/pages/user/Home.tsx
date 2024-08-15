import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Product from '../../types/Product'
import { callGetAllProduct } from '../../services/ProductService'

const Home: React.FC = () => {

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetch = async () => {
      const res = await callGetAllProduct()
      setProducts([...res.result])
    }
    fetch()
  }, [])

  return (
    <Box>

    </Box>
  )
}

export default Home