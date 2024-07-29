import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { callGetBrand } from '../../../../services/BrandService'
import { callGetCategory } from '../../../../services/CategoryService'
import { callAddProduct } from '../../../../services/ProductService'
import Brand from '../../../../types/Brand'
import Category from '../../../../types/Category'


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
    const [categories, setCategories] = useState<Category[]>([])
    const [brands, setBrand] = useState<Brand[]>([])

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
        if (e.target.files != null) {
            setProduct({
                ...product,
                images: [
                    ...product.images,
                    e.target.files[0]
                ]
            })
        }
    }

    const handleAdd = async () => {
        const formData = new FormData();
        formData.append('code', product.code);
        formData.append('name', product.name);
        formData.append('price', product.price.toString());
        formData.append('quantity', product.quantity.toString());
        formData.append('description', product.description);
        formData.append('codeCategory', product.code_category);
        formData.append('codeBrand', product.code_brand);
        product.images.forEach(image => {
            formData.append('fileImages', image);
        });

        try {
            const res = await callAddProduct(formData);
            console.log(res);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    useEffect(()=>{
        console.log(product)
    },[product])

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
                <div>
                    Images
                    <br /> <input type="file" className='form-control' name='images' multiple onChange={handleImage} />
                    {
                        product.images.map((image, index) => {
                            if (index < 4)
                                return <div key={index} ><input type="file" className='form-control' name='images' multiple onChange={handleImage} /></div>
                        })
                    }
                </div>
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