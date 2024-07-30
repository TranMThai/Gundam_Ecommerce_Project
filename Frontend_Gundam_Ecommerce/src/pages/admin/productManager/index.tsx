import { Button, Chip, Container, Grid, LinearProgress, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../constants/ApiUrl'
import { callGetAllProduct } from '../../../services/ProductService'
import Product from '../../../types/Product'

const ProductManager: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([])

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                            <TableRow key={pro.id}>
                                <TableCell>
                                    <Grid container gap={0.5}>
                                        <Grid item xl={3} sm={6}>
                                            <img src={`${api}/images/${pro.images[0]}`} alt=""
                                                style={{
                                                    maxHeight: '5em',
                                                    aspectRatio: '1/1',
                                                    objectFit: 'contain',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xl={8} sm={6}>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Typography variant='subtitle2'>{pro.name}</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant='caption'>{pro.code}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell>${pro.price}</TableCell>
                                <TableCell>
                                    <LinearProgress
                                        variant="determinate"
                                        value={pro.quantity}
                                        color={pro.quantity >= 50 ? 'success' : pro.quantity != 0 ? 'warning' : 'error'}
                                        sx={{
                                            height: '0.5em',
                                            width: '6em',
                                            borderRadius: '0.25em'
                                        }}
                                    />
                                    <Typography variant='caption'>
                                        {pro.quantity >= 50 ? `${pro.quantity} in stock` : pro.quantity != 0 ? `${pro.quantity} low stock` : 'out of stock'}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            {pro.category.name}
                                        </Grid>
                                        <Grid item xs={12}>
                                            {pro.brand.name}
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell>{pro.status ? <Chip label="Available" color="success" /> : <Chip label="Discontinued" color="error" />}</TableCell>
                                <TableCell>
                                    <Button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                        color='inherit'
                                        sx={{
                                            padding: 0,
                                            width: '2.5em',
                                            minWidth: '2.5em',
                                            aspectRatio: '1/1',
                                            borderRadius: '50%',
                                        }}
                                    >
                                        <i className="fa-solid fa-ellipsis-vertical fs-6" />
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                        anchorOrigin={{
                                            vertical: 'center',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'center',
                                            horizontal: 'right',
                                        }}
                                        elevation={1}
                                        sx={{
                                            borderRadius: '2em'
                                        }}
                                    >
                                        <Link to={'/admin/product/create'}
                                            style={{
                                                textDecoration: 'none'
                                            }}>
                                            <MenuItem
                                                style={{
                                                    color: 'black'
                                                }}
                                            >
                                                <i className="fa-solid fa-eye me-3" />
                                                View</MenuItem>
                                        </Link>
                                        <Link to={'/admin/product/create'}
                                            style={{
                                                textDecoration: 'none'
                                            }}>
                                            <MenuItem
                                                style={{
                                                    color: 'black'
                                                }}
                                            >
                                                <i className="fa-solid fa-pen me-3" />
                                                Edit</MenuItem>
                                        </Link>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container >
    )
}

export default ProductManager
