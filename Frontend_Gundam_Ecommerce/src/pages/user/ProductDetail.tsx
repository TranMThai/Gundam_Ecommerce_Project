import { Box, Button, Chip, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageCarousel from '../../components/ImageCarousel';
import { callGetProductByCode } from '../../services/ProductService';
import Product from '../../types/Product';

const ProductDetail: React.FC = () => {

    const { code } = useParams()
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

    useEffect(() => {

        const fetchProduct = async () => {
            try {
                const res = await callGetProductByCode(code + "")
                setProduct({ ...res.result })
            } catch (error) {
                console.error("Lỗi fetch get product by id")
            }
        }

        fetchProduct()
    }, [])

    return (
        <Container
            sx={{
                marginTop: {
                    xs: 2,
                    sm: 5
                }
            }}
        >
            <Grid container>
                <Grid item md={6} xs={12}>
                    <ImageCarousel
                        product={product}
                    />
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
                        <Typography variant='h5'
                            style={{ fontWeight: 500 }}
                        >{product.code}</Typography>

                        <Typography variant='h4'
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
                        số lượng
                        <Grid container justifyContent={'space-between'} rowGap={2}>
                            <Grid item lg={5.5} xs={12}>
                                <Button
                                    variant='contained'
                                    fullWidth
                                    sx={{
                                        textTransform: 'none',
                                        display: 'table-cell',
                                        height: '3em'
                                    }}
                                >
                                    <i className="fa-solid fa-cart-shopping me-2" />
                                    Add to card
                                </Button>
                            </Grid>
                            <Grid item lg={5.5} xs={12}>
                                <Button
                                    variant='contained'
                                    fullWidth
                                    color='success'
                                    sx={{
                                        textTransform: 'none',
                                        display: 'table-cell',
                                        height: '3em'
                                    }}
                                >
                                    Buy now
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid >
        </Container >
    );
};

export default ProductDetail;
