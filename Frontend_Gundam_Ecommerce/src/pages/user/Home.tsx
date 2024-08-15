import { Box, Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Product from '../../types/Product'
import { callGetAllProduct } from '../../services/ProductService'
import ProductCard from '../../components/ProductCard'

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
    <Container maxWidth='xl'>
      <Grid container>
        {products.map(product =>
          <Grid
            item
            key={product.id}
            lg={3}
            md={4}
            xs={6}
          >
            <ProductCard
              product={product}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  )
}

export default Home