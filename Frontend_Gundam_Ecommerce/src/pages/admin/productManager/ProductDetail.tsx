import { Box, Button, Chip, Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../../../constants/ApiUrl'
import { callGetProductById, callUpdateStatus } from '../../../services/ProductService'
import Product from '../../../types/Product'

const ProductDetail: React.FC = () => {

    const { id } = useParams()
    const [product, setProduct] = useState<Product>({
        id: 0,
        code: '',
        name: '',
        price: 0,
        quantity: 0,
        description: '',
        status: false,
        category: {
            code: '',
            name: ''
        },
        brand: {
            code: '',
            name: ''
        },
        images: []
    })
    const [carouselIndex] = useState<number>(0)

    const fetchProduct = async () => {
        try {
            const res = await callGetProductById(Number(id))
            setProduct({ ...res })
        } catch (error) {
            console.error("Lỗi fetch get product by id")
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    const handleUpdateStatus = () => {
        const updateStatus = async () => {
            await callUpdateStatus(product.id)
            await fetchProduct()
        }
        updateStatus()
    }

    return (
        <Container>
            <Grid container>
                <Grid item md={6} xs={12}>
                    <div id="demo" className="carousel slide" data-interval="true" data-bs-ride="carousel" style={{
                        background: '#ffffff',
                        borderRadius: '1em',
                        overflow: 'hidden',
                        border: '1px solid black',
                        width: '100%'
                    }}  >

                        <div className="carousel-indicators">
                            {product?.images.map((_, index) =>
                                <button key={index}
                                    type="button"
                                    data-bs-target="#demo"
                                    data-bs-slide-to={index}
                                    className={`${carouselIndex == index ? 'active' : ''}`}>
                                </button>
                            )}
                        </div>

                        <div className="carousel-inner">
                            {product?.images.map((image, index) =>
                                <div key={image}
                                    className={`carousel-item ${carouselIndex == index ? 'active' : ''}`}
                                    data-bs-interval="3000"
                                    style={{
                                        aspectRatio: '1/1',
                                        width: '100%',
                                    }}>
                                    <img src={`${api}/images/${image}`} alt=""
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                        }} />
                                </div>
                            )}
                        </div>

                        <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon"></span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                            <span className="carousel-control-next-icon"></span>
                        </button>
                    </div>
                </Grid>
                <Grid item md={5.5} xs={12}>
                    <Box
                        display='flex'
                        flexDirection='column'
                        rowGap={2}
                        sx={{
                            padding: {
                                md: '0 3em',
                                sm: '3em 0',
                                xs: '1.5em 0'
                            }
                        }}
                    >
                        <Grid container gap={2}>
                            <Grid item>
                                <Chip
                                    variant='outlined'
                                    color={product.quantity >= 50 ? `success` : product.quantity != 0 ? `warning` : 'error'}
                                    label={product.quantity >= 50 ? `${product.quantity} in stock` : product.quantity != 0 ? `${product.quantity} low stock` : 'out of stock'}
                                    style={{
                                        fontWeight: 600,
                                        fontSize: '1em'
                                    }}
                                />
                            </Grid>
                            <Chip
                                variant='filled'
                                color={product.status ? 'success' : 'error'}
                                label={product.status ? 'Available' : 'Discontinued'}
                                style={{
                                    fontWeight: 600,
                                    fontSize: '1em'
                                }}
                            />
                        </Grid>
                        <Typography variant='h6'
                            style={{ fontWeight: 500 }}
                        >{product.code}</Typography>

                        <Typography variant='h5'
                            style={{ fontWeight: 500 }}
                        >{product.name}</Typography>

                        <Typography variant='h4'
                            style={{ fontWeight: 500 }}
                        >${product.price}</Typography>

                        <Typography variant='body2'>{product.description}</Typography>

                        <Typography variant='body1'
                            style={{ fontWeight: 500 }}
                        >
                            Brand: {product.brand.name}
                        </Typography>

                        <Typography variant='body1'
                            style={{ fontWeight: 500 }}
                        >
                            Category: {product.category.code} - {product.category.name}
                        </Typography>

                        <Grid container justifyContent={'space-between'} rowGap={2}>
                            <Grid item lg={5.5} xs={12}>
                                <Link to={`/admin/product/update/${product.id}`}>
                                    <Button
                                        variant='contained'
                                        fullWidth
                                        sx={{
                                            textTransform: 'none',
                                            display: 'table-cell',
                                            height: '3em'
                                        }}
                                    >
                                        <i className="fa-solid fa-pen me-2" />
                                        Edit
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item lg={5.5} xs={12}>
                                <Button
                                    variant='contained'
                                    fullWidth
                                    color={product.status ? 'error' : 'success'}
                                    sx={{
                                        textTransform: 'none',
                                        display: 'table-cell',
                                        height: '3em'
                                    }}
                                    onClick={handleUpdateStatus}
                                >
                                    {product.status ? <i className="fa-solid fa-xmark me-2" /> : <i className="fa-solid fa-check me-2" />}

                                    {product.status ? 'Stop selling' : 'Start selling'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid >
        </Container >
    )
}

export default ProductDetail