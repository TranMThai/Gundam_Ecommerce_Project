import { Box, Button, Container, Grid, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { callDeleteCategoryByCode, callGetAllCategory, callGetCategoryByCode, callSaveCategory } from '../../../services/CategoryService'
import Category from '../../../types/Category'
import AttributesTable from '../../../components/AttributesTable'

const CategoryManager: React.FC = () => {

    const [categories, setCategories] = useState<Category[]>([])
    const [category, setCategory] = useState<Category>({
        code: '',
        name: ''
    })

    const fetchCategories = async () => {
        const res = await callGetAllCategory()
        setCategories([...res])
    }

    useEffect(() => {
        fetchCategories()
    }, [])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCategory({
            ...category,
            [name]: value
        })
    }

    const handleSave = () => {
        const fetch = async () => {
            await callSaveCategory(category)
            await fetchCategories()
        }
        fetch()
        handleClear()
    }



    const handleClear = () => {
        setCategory({
            code: '',
            name: ''
        })
    }


    return (
        <Container
            maxWidth='lg'
        >
            Categories
            <Grid container justifyContent='space-between'>
                <Grid item sm={5.5} xs={12}>
                    <AttributesTable
                        attributes={categories}
                        setAttribute={setCategory}
                        fetchAttributes={fetchCategories}
                        callGetAttributeByCode={callGetCategoryByCode}
                        callDeleteAttributeByCode={callDeleteCategoryByCode}
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
                                value={category.code}
                                onChange={handleChange}
                            />
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                label="Name"
                                name='name'
                                value={category.name}
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

export default CategoryManager