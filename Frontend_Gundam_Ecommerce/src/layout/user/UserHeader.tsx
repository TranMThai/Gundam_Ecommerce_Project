import { AppBar, Box, Drawer, IconButton, Menu, MenuItem, Stack, Toolbar } from '@mui/material'
import React, { useState } from 'react'
import { numberCartStyle } from '../../styles/styles'

const UserHeader: React.FC = () => {

    const [isLargeSize, setIsLargeSize] = useState<boolean>(true)

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box
                position='sticky'
                top={0}
            >
                <AppBar
                    position='static'
                    sx={{
                        backgroundColor: 'white',
                        boxShadow: 'none',
                        borderBottom: '1px solid #b8b8b8'
                    }}
                >
                    {isLargeSize
                        ?
                        <Toolbar >
                            <Box
                                display='flex'
                                justifyContent='space-between'
                                width='100%'
                                mx={15}
                            >
                                <Box>
                                    <img src="/logo.png" alt="" height={45} />
                                </Box>
                                <Box>
                                    <IconButton
                                        sx={{
                                            color: '#1A2023',
                                            mr: 8
                                        }}
                                    >
                                        <i className='fa-solid fa-cart-shopping fs-2'
                                            style={{
                                                position: 'relative'
                                            }}>
                                            <Box
                                                component='span'
                                                sx={numberCartStyle}
                                            >
                                                5
                                            </Box>
                                        </i>
                                    </IconButton>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}
                                        sx={{
                                            color: '#1A2023'
                                        }}
                                    >
                                        <i className='fa-solid fa-user fs-2' />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                                    </Menu>
                                </Box>
                            </Box>
                        </Toolbar>
                        :
                        <Toolbar >
                            <IconButton
                                edge="start"
                                aria-label="menu"
                                sx={{
                                    fontSize: 30,
                                    mr: 2,
                                    color: '#1A2023'
                                }}
                            >
                                <i className="fa-solid fa-bars" />
                            </IconButton>
                        </Toolbar>
                    }
                </AppBar>
            </Box >

        </>
    )
}

export default UserHeader