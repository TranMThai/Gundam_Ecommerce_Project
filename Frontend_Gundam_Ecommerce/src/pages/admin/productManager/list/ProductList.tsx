import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { callGetAllProduct } from '../../../../services/ProductService'
import Product from '../../../../types/Product'
import ProductTableRow from '../../../../components/ProductTableRow'

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const fetch = async () => {
            const res = await callGetAllProduct()
            setProducts([
                ...res
            ])
        }
        fetch()
    }, [])

    return (
        <Container
            maxWidth='xl'
        >
            <Typography variant='h3' className='d-inline'>
                List product
            </Typography>
            <Link to='/admin/product/create'>
                <Button
                    variant='contained'
                    color='primary'
                    style={{
                        textTransform: 'none',
                        float: 'right',
                        display: 'table-cell',
                        borderRadius: '0.5em'
                    }}
                >
                    <i className="fa-solid fa-plus me-2"></i>
                    New product
                </Button>
            </Link>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Category/Brand</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map(pro =>
                            <ProductTableRow
                                key={pro.id}
                                pro={pro}
                            />
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container >
    )
}

export default ProductList
