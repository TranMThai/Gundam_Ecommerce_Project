import { Button, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useState } from 'react'
import Category from '../types/Category'
import Brand from '../types/Brand'

interface IProps {
    attributes: Category[] | Brand[],
    setAttribute: React.Dispatch<React.SetStateAction<Category|Brand>>
    fetchAttributes: () => Promise<void>
    callGetAttributeByCode: (code: string) => Promise<any>
    callDeleteAttributeByCode: (code: string) => Promise<any>
}

const AttributesTable: React.FC<IProps> = ({ attributes, setAttribute, fetchAttributes, callGetAttributeByCode, callDeleteAttributeByCode }) => {

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

    const handleGetById = () => {
        const fetch = async () => {
            const res = await callGetAttributeByCode(selectedCategory)
            setAttribute({ ...res })
        }
        fetch()
        setAnchorEl(null)
    }

    const handleDelete = () => {
        const fetch = async () => {
            await callDeleteAttributeByCode(selectedCategory)
            await fetchAttributes()
        }
        fetch()
        setAnchorEl(null)
    }

    return (
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
                    {attributes.map(a =>
                        <TableRow key={a.code}>
                            <TableCell>{a.code}</TableCell>
                            <TableCell>{a.name}</TableCell>
                            <TableCell width={5}>
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={(e) => handleClick(e, a.code)}
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
    )
}

export default AttributesTable