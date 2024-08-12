import { Box, Button, Container, FormControl, FormHelperText, ImageList, ImageListItem, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { callGetAllBrand } from '../../../services/BrandService'
import { callGetAllCategory } from '../../../services/CategoryService'
import { callAddProduct } from '../../../services/ProductService'
import Brand from '../../../types/Brand'
import Category from '../../../types/Category'
import { useNavigate } from 'react-router-dom'
import { HttpStatusCode } from 'axios'


export interface ProductRequest {
    code: string,
    name: string,
    price: number,
    quantity: number,
    description: string,
    code_category: string,
    code_brand: string,
    images: File[]
}

const ProductCreate: React.FC = () => {

    const navigate = useNavigate()

    const [product, setProduct] = useState<ProductRequest>({
        code: '',
        name: '',
        price: 0,
        quantity: 0,
        description: '',
        code_category: '',
        code_brand: '',
        images: []
    })
    
    const [err, setErr] = useState({
        code: '',
        name: '',
        price: '',
        quantity: '',
        description: '',
        code_category: '',
        code_brand: '',
        images: ''
    })

    const [categories, setCategories] = useState<Category[]>([])
    const [brands, setBrand] = useState<Brand[]>([])
    const [previewImages, setPreviewImages] = useState<string[]>([])

    useEffect(() => {
        const getCategory = async () => {
            const res = await callGetAllCategory();
            setCategories([...res])
        }
        getCategory()

        const getBrand = async () => {
            const res = await callGetAllBrand();
            setBrand([...res])
        }
        getBrand()
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

    const validateForm = (): boolean => {
        let isValid = true;
        const newErr = { ...err };

        if (product.code.trim() === '' || product.code.length < 3) {
            newErr.code = 'Code is required and must be at least 3 characters';
            isValid = false;
        } else {
            newErr.code = '';
        }

        if (product.name.trim() === '' || product.name.length < 3) {
            newErr.name = 'Name is required and must be at least 3 characters';
            isValid = false;
        } else {
            newErr.name = '';
        }

        if (product.price <= 0) {
            newErr.price = 'Price must be a positive number';
            isValid = false;
        } else {
            newErr.price = '';
        }

        if (product.quantity <= 0) {
            newErr.quantity = 'Quantity must be a positive number';
            isValid = false;
        } else {
            newErr.quantity = '';
        }

        if (product.description.trim() === '') {
            newErr.description = 'Description is require';
            isValid = false;
        } else {
            newErr.description = '';
        }

        if (product.code_category.trim() === '') {
            newErr.code_category = 'Category must be selected';
            isValid = false;
        } else {
            newErr.code_category = '';
        }

        if (product.code_brand.trim() === '') {
            newErr.code_brand = 'Brand must be selected';
            isValid = false;
        } else {
            newErr.code_brand = '';
        }

        if (product.images.length === 0) {
            newErr.images = 'At least one image must be uploaded';
            isValid = false;
        } else {
            newErr.images = '';
        }

        setErr(newErr);
        return isValid;
    };

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

    const handleAdd = async () => {
        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append('code', product.code);
        formData.append('name', product.name);
        formData.append('price', product.price.toString());
        formData.append('quantity', product.quantity.toString());
        formData.append('description', product.description);
        formData.append('codeCategory', product.code_category);
        formData.append('codeBrand', product.code_brand);
        product.images.forEach(image => {
            formData.append('images', image);
        });

        try {
            const res = await callAddProduct(formData);
            if (res.code === HttpStatusCode.Ok) {
                navigate('/admin/product');
            }

        } catch (error) {
            console.error(error);
        }
    };

    console.log("reload")
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
            >Create product</Typography>
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
                        helperText={err.code}
                        error={err.code != ''}
                    />
                </Box>
                <Box>
                    <TextField
                        label="Name"
                        fullWidth
                        value={product.name}
                        name='name'
                        onChange={handleChangeInput}
                        helperText={err.name}
                        error={err.name != ''}
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
                        helperText={err.price}
                        error={err.price != ''}
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
                        helperText={err.quantity}
                        error={err.quantity != ''}
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
                        helperText={err.description}
                        error={err.description != ''}
                    />
                </Box>
                <FormControl
                    fullWidth
                    error={err.code_category != ''}
                >
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
                    <FormHelperText>{err.code_category}</FormHelperText>
                </FormControl>
                <FormControl
                    fullWidth
                    error={err.code_brand != ''}>
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
                    <FormHelperText>{err.code_brand}</FormHelperText>
                </FormControl>
                <Box>
                    <Typography
                        mr={2}
                        display='inline'
                        color={err.images ? 'red' : ''}
                    >
                        Images:</Typography>
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

                    <FormHelperText error>{err.images}</FormHelperText>

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
                <div className='d-flex justify-content-center'>
                    <Button
                        variant='contained'
                        onClick={handleAdd}
                        size='large'
                        color='primary'
                    >
                        ADD
                    </Button>
                </div>
            </Box>
        </Container>
    )
}

export default ProductCreate