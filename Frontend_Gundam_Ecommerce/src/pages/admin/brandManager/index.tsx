import { Box, Button, Container, Grid, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AttributesTable from '../../../components/AttributesTable'
import Brand from '../../../types/Brand'
import { callDeleteBrandByCode, callGetAllBrand, callGetBrandByCode, callSaveBrand } from '../../../services/BrandService'

const BrandManager: React.FC = () => {

    const [brands, setBrands] = useState<Brand[]>([])
    const [brand, setBrand] = useState<Brand>({
        code: '',
        name: ''
    })

    const fetchBrands = async () => {
        const res = await callGetAllBrand()
        setBrands([...res])
    }

    useEffect(() => {
        fetchBrands()
    }, [])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setBrand({
            ...brand,
            [name]: value
        })
    }

    const handleSave = () => {
        const fetch = async () => {
            await callSaveBrand(brand)
            await fetchBrands()
        }
        fetch()
        handleClear()
    }



    const handleClear = () => {
        setBrand({
            code: '',
            name: ''
        })
    }


    return (
        <Container
            maxWidth='lg'
        >
            Brands
            <Grid container justifyContent='space-between'>
                <Grid item sm={5.5} xs={12}>
                    <AttributesTable
                        attributes={brands}
                        setAttribute={setBrand}
                        fetchAttributes={fetchBrands}
                        callGetAttributeByCode={callGetBrandByCode}
                        callDeleteAttributeByCode={callDeleteBrandByCode}
                    />
                </Grid>
                <Grid item sm={5} xs={12}>
                    <Stack
                        direction='column'
                        gap={3}
                        sx={{
                            padding: {
                                xs: '2em 0'
                            }
                        }}
                    >
                        <Box>
                            <TextField
                                fullWidth
                                label="Code"
                                name='code'
                                value={brand.code}
                                onChange={handleChange}
                            />
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                label="Name"
                                name='name'
                                value={brand.name}
                                onChange={handleChange}
                            />
                        </Box>
                        <Grid container justifyContent='space-around' rowGap={1}>
                            <Grid item sm={5} xs={12}>
                                <Button
                                    variant='contained'
                                    fullWidth
                                    color='success'
                                    onClick={handleSave}
                                >
                                    Save
                                </Button>
                            </Grid>
                            <Grid item sm={5} xs={12}>
                                <Button
                                    variant='contained'
                                    fullWidth
                                    color='primary'
                                    onClick={handleClear}
                                >
                                    Clear
                                </Button>
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    )
}

export default BrandManager