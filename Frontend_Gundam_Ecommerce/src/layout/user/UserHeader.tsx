import { AppBar, BottomNavigation, BottomNavigationAction, Box, Container, IconButton, Menu, MenuItem, Toolbar, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { numberCartStyle } from '../../styles/styles';

const UserHeader: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [bottomNavValue, setBottomNavValue] = useState<number>(0);
    const isLargeSize = useMediaQuery('(min-width: 900px)');

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box position='sticky' top={0} zIndex={1}>
            <AppBar position='static' sx={{ backgroundColor: 'white', boxShadow: 'none', borderBottom: '1px solid #b8b8b8' }}>
                <Toolbar>
                    <Container maxWidth='xl' sx={{ display: 'flex', justifyContent: isLargeSize ? 'space-between' : 'center', alignItems: 'center' }}>
                        {!isLargeSize && (
                            <IconButton
                                aria-label="menu"
                                sx={{ fontSize: 30, color: '#1A2023' }}
                            >
                                <img src="/logo.png" alt="" height={45} />
                            </IconButton>
                        )}

                        {isLargeSize && (
                            <>
                                <img src="/logo.png" alt="Logo" height={45} />
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton sx={{ color: '#1A2023', mr: 8 }}>
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
                                        sx={{ color: '#1A2023' }}
                                    >
                                        <i className='fa-solid fa-user fs-2' />
                                    </IconButton>
                                </Box>
                            </>
                        )}
                    </Container>
                </Toolbar>
            </AppBar>

            {!isLargeSize && (
                <BottomNavigation
                    value={bottomNavValue}
                    onChange={(_, newValue) => {
                        setBottomNavValue(newValue);
                    }}
                    showLabels
                    sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1, boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)' }}
                >
                    <BottomNavigationAction
                        label="Home"
                        icon={<i className='fa-solid fa-house fs-2' />}
                    />
                    <BottomNavigationAction
                        label="Cart"
                        icon={
                            <Box position='relative'>
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
                                <Box component='span' sx={numberCartStyle}>5</Box>
                            </Box>
                        }
                    />
                    <BottomNavigationAction
                        label="Account"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        icon={<i className='fa-solid fa-user fs-2' />}
                        onClick={handleMenu}
                    />
                </BottomNavigation>
            )}
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </Box>
    )
}

export default UserHeader
