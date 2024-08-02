import { Box, Button, Container, Grid, Menu, MenuItem, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Category from '../../../types/Category'
import { callDeleteCategoryByCode, callGetAllCategory, callGetCategoryByCode, callSaveCategory } from '../../../services/CategoryService'

const CategoryManager: React.FC = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [selectedCategory, setSelectedCategory] = useState<string>('')

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, code: string) => {
        setAnchorEl(event.currentTarget);
        setSelectedCategory(code)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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

    const handleGetById = () => {
        const fetch = async () => {
            const res = await callGetCategoryByCode(selectedCategory)
            setCategory({ ...res })
        }
        fetch()
        handleClose()
    }

    const handleSave = () => {
        const fetch = async () => {
            await callSaveCategory(category)
            await fetchCategories()
        }
        fetch()
        handleClear()
    }

    const handleDelete = () => {
        const fetch = async () => {
            await callDeleteCategoryByCode(selectedCategory)
            await fetchCategories()
        }
        fetch()
        handleClose()
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
            <Grid container justifyContent='space-between'>
                <Grid item sm={5.5} xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Code</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {categories.map(c =>
                                    <TableRow key={c.code}>
                                        <TableCell>{c.code}</TableCell>
                                        <TableCell>{c.name}</TableCell>
                                        <TableCell width={5}>
                                            <Button
                                                id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={(e) => handleClick(e, c.code)}
                                                color='inherit'
                                                sx={{
                                                    padding: 0,
                                                    width: '2.5em',
                                                    minWidth: '2.5em',
                                                    aspectRatio: '1/1',
                                                    borderRadius: '50%',
                                                    float: 'right'
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
                                                elevation={2}
                                                sx={{
                                                    borderRadius: '2em'
                                                }}
                                            >
                                                <MenuItem
                                                    onClick={handleGetById}
                                                >
                                                    <i className="fa-solid fa-pen me-3" />
                                                    Edit
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={handleDelete}
                                                >
                                                    <i className="fa-solid fa-trash me-3" />
                                                    Delete
                                                </MenuItem>
                                            </Menu>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
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