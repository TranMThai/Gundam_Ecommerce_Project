import { Button, Chip, Grid, LinearProgress, Menu, MenuItem, TableCell, TableRow, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import api from '../constants/ApiUrl'
import Product from '../types/Product'
import { linkStyle } from '../styles/styles'

interface IProps {
    pro: Product
}

const ProductTableRow: React.FC<IProps> = ({ pro }) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <TableRow>
            <TableCell>
                <Grid container gap={0.5}>
                    <Grid item lg={3}>
                        <img src={`${api}/images/${pro.images[0]}`} alt=""
                            style={{
                                maxHeight: '5em',
                                aspectRatio: '1/1',
                                objectFit: 'contain',
                            }}
                        />
                    </Grid>
                    <Grid item lg={8}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Link to={`/admin/product/${pro.id}`}
                                    style={linkStyle}>
                                    <Typography variant='subtitle2'>{pro.name}</Typography>
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='caption'>{pro.code}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </TableCell>
            <TableCell>${pro.price}</TableCell>
            <TableCell>
                <LinearProgress
                    variant="determinate"
                    value={pro.quantity}
                    color={pro.quantity >= 50 ? 'success' : pro.quantity != 0 ? 'warning' : 'error'}
                    sx={{
                        height: '0.5em',
                        width: '6em',
                        borderRadius: '0.25em'
                    }}
                />
                <Typography variant='caption'>
                    {pro.quantity >= 50 ? `${pro.quantity} in stock` : pro.quantity != 0 ? `${pro.quantity} low stock` : 'out of stock'}
                </Typography>
            </TableCell>
            <TableCell>
                <Grid container>
                    <Grid item xs={12}>
                        {pro.category.name}
                    </Grid>
                    <Grid item xs={12}>
                        {pro.brand.name}
                    </Grid>
                </Grid>
            </TableCell>
            <TableCell>{pro.status ? <Chip label="Available" color="success" /> : <Chip label="Discontinued" color="error" />}</TableCell>
            <TableCell>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={(e) => handleClick(e)}
                    color='inherit'
                    sx={{
                        padding: 0,
                        width: '2.5em',
                        minWidth: '2.5em',
                        aspectRatio: '1/1',
                        borderRadius: '50%',
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
                    elevation={5}
                    sx={{
                        borderRadius: '2em'
                    }}
                >
                    <Link to={`/admin/product/${pro.id}`}
                        style={linkStyle}>
                        <MenuItem>
                            <i className="fa-solid fa-eye me-3" />
                            View
                        </MenuItem>
                    </Link>
                    <Link to={`/admin/product/update/${pro.id}`}
                        style={linkStyle}>
                        <MenuItem>
                            <i className="fa-solid fa-pen me-3" />
                            Edit
                        </MenuItem>
                    </Link>
                </Menu>
            </TableCell>
        </TableRow>
    )
}

export default ProductTableRow