import { Box, Typography } from '@mui/material';
import React from 'react';
import Product from '../types/Product';
import api from '../constants/ApiUrl';
import { useNavigate } from 'react-router-dom';

interface IProps {
    product: Product;
}

const ProductCard: React.FC<IProps> = ({ product }) => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                aspectRatio: '1/1.4',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.08)',
                borderRadius: 3,
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.1)',
                },
                margin: {
                    md: 2,
                    xs: 1,
                },
                backgroundColor: 'white',
            }}
            onClick={() => navigate(product.code)}
        >
            <Box
                sx={{
                    width: '100%',
                    aspectRatio: '1/1',
                    padding: 0,
                    overflow: 'hidden',
                    backgroundColor: '#f9f9f9',
                }}
            >
                <img
                    src={`${api}/images/${product.images[0]}`}
                    alt={product.name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                    }}
                />
            </Box>
            <Box
                sx={{
                    padding: {
                        xs: '0.5rem',
                        sm: '0.75rem',
                        md: '1rem',
                    },
                    textAlign: 'center',
                }}
            >
                <Typography
                    variant='h6'
                    sx={{
                        height: 60,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {product.name}
                </Typography>
                <Typography
                    variant='h6'
                    color='red'
                    sx={{
                        fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                        fontWeight: 700,
                        marginTop: '0.5rem',
                    }}
                >
                    ${product.price}
                </Typography>
            </Box>
        </Box>
    );
};

export default ProductCard;
