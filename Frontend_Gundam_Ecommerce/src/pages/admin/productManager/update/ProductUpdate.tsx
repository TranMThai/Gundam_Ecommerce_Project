import { Box, Button, Container, FormControl, FormControlLabel, ImageList, ImageListItem, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { callGetBrand } from '../../../../services/BrandService';
import { callGetCategory } from '../../../../services/CategoryService';
import { callGetProductById, callUpdateProduct } from '../../../../services/ProductService';
import Brand from '../../../../types/Brand';
import Category from '../../../../types/Category';


export interface ProductRequest {
    id: number,
    code: string,
    name: string,
    price: number,
    quantity: number,
    description: string,
    code_category: string,
    code_brand: string,
    images: File[],
    status: boolean
}

const ProductUpdate: React.FC = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState<ProductRequest>({
        id: 0,
        code: '',
        name: '',
        price: 0,
        quantity: 0,
        description: '',
        code_category: '',
        code_brand: '',
        images: [],
        status: false
    })
    const [categories, setCategories] = useState<Category[]>([])
    const [brands, setBrand] = useState<Brand[]>([])
    const [previewImages, setPreviewImages] = useState<string[]>([])



    useEffect(() => {

        const getCategory = async () => {
            const res = await callGetCategory();
            setCategories([...res])
        }
        getCategory()

        const getBrand = async () => {
            const res = await callGetBrand();
            setBrand([...res])
        }
        getBrand()

        const getProduct = async () => {
            const res = await callGetProductById(id + '');
            setProduct({
                ...res,
                code_category: res.category.code,
                code_brand: res.brand.code
            })
        }
        getProduct()

    }, [])

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        })
    }

    const handleSelect = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        })
    }

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            status: !product.status
        })
    }

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files?.length) {
            try {
                handlePreviewImages(files)
            } catch (error) {
                return
            }

            setProduct({
                ...product,
                images: [
                    ...files
                ]
            })
        }
    }

    const handlePreviewImages = (files: FileList) => {
        const previewImageArr = []
        for (const file of files) {
            if (!file.type.startsWith('image/')) {
                throw new Error
            }
            previewImageArr.push(URL.createObjectURL(file))
        }
        setPreviewImages([
            ...previewImageArr
        ])
    }

    useEffect(() => {
        return () => {
            previewImages.forEach(i => URL.revokeObjectURL(i))
        }
    }, [previewImages])

    const removeImage = (index: number) => {
        setPreviewImages([
            ...previewImages.filter(img => img !== previewImages[index])
        ])
        setProduct({
            ...product,
            images: [
                ...product.images.filter(img => img !== product.images[index])
            ]
        })
    }

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append('id', product.id.toString());
        formData.append('code', product.code);
        formData.append('name', product.name);
        formData.append('price', product.price.toString());
        formData.append('quantity', product.quantity.toString());
        formData.append('description', product.description);
        formData.append('codeCategory', product.code_category);
        formData.append('codeBrand', product.code_brand);
        formData.append('status', product.status?'true':'false');
        product.images.forEach(image => {
            formData.append('fileImages', image);
        });

        try {
            await callUpdateProduct(formData);
            navigate('/admin/product')

        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <Container
            maxWidth='md'
        >
            <Typography
                variant='h3'
                sx={{
                    fontWeight: '400',
                    mb: 3
                }}
            >Edit product</Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2em'
                }}
            >
                <Box>
                    <TextField
                        label="Code"
                        fullWidth
                        value={product.code}
                        name='code'
                        onChange={handleChangeInput}
                    />
                </Box>
                <Box>
                    <TextField
                        label="Name"
                        fullWidth
                        value={product.name}
                        name='name'
                        onChange={handleChangeInput}
                    />
                </Box>
                <Box>
                    <TextField
                        label="Price"
                        fullWidth
                        type='number'
                        value={product.price}
                        name='price'
                        onChange={handleChangeInput}
                    />
                </Box>
                <Box>
                    <TextField
                        label="Quantity"
                        fullWidth
                        type='number'
                        value={product.quantity}
                        name='quantity'
                        onChange={handleChangeInput}
                    />
                </Box>
                <Box>
                    <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        value={product.description}
                        name='description'
                        onChange={handleChangeInput}
                    />
                </Box>
                <FormControl fullWidth >
                    <InputLabel id='category'>Category</InputLabel>
                    <Select
                        labelId='category'
                        value={product.code_category}
                        label='Category'
                        name='code_category'
                        onChange={handleSelect}
                    >
                        {categories.map(c =>
                            <MenuItem key={c.code} value={c.code} >{c.code + ' - ' + c.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <FormControl fullWidth >
                    <InputLabel id='brand'>Brand</InputLabel>
                    <Select
                        labelId='brand'
                        value={product.code_brand}
                        label='Brand'
                        name='code_brand'
                        onChange={handleSelect}
                    >
                        {brands.map(b =>
                            <MenuItem key={b.code} value={b.code} >{b.code + ' - ' + b.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <Box>
                    <span className='me-3'>Images:</span>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                    >
                        <i className="fa-solid fa-cloud-arrow-up fs-5 me-2" />
                        Upload image
                        <input type="file" multiple onChange={handleImage} style={{ display: 'none' }} />
                    </Button>

                    <ImageList
                        cols={3}
                        sx={{
                            mt: '1.5em',
                            maxHeight: '25em'
                        }}>
                        {previewImages.map((img, index) => (
                            <ImageListItem key={img}
                                sx={{
                                    position: 'relative'
                                }}>
                                <img
                                    src={img}
                                    alt={img}
                                    loading="lazy"
                                />
                                <Button
                                    variant="contained"
                                    color='inherit'
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        padding: 0,
                                        width: '2.5em',
                                        minWidth: '2.5em',
                                        aspectRatio: '1/1',
                                        borderRadius: '50%',
                                        zIndex: 2,
                                        ":hover": {
                                            backgroundColor: '#f04343'
                                        }
                                    }}
                                    onClick={() => removeImage(index)}
                                >
                                    <i className="fa-solid fa-xmark" />
                                </Button>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>
                <Box>
                    <span style={{ marginRight: '1em' }}>Status:</span>
                    <Switch
                        checked={Boolean(product.status)}
                        onChange={handleStatusChange}
                        sx={{
                            transform: 'scale(1.5)'
                        }}
                    />
                </Box>
                <div className='d-flex justify-content-center'>
                    <Button
                        variant='contained'
                        onClick={handleUpdate}
                        size='large'
                        color='primary'
                    >
                        Update
                    </Button>
                </div>
            </Box>
        </Container>
    )
}

export default ProductUpdate