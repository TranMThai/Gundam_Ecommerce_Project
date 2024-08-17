import { AppBar, Box, Container, IconButton, TextField, Toolbar, useMediaQuery } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { numberCartStyle } from '../../styles/styles';

interface IProps {
    isLargeSize: boolean,
    handleMenu: (event: React.MouseEvent<HTMLElement>) => void
}

const UserHeader: React.FC<IProps> = ({isLargeSize, handleMenu}) => {
    const navigate = useNavigate()
    const isXsScreen = useMediaQuery('(max-width:550px)');

    return (
        <Box position='sticky' top={0} zIndex={1}>
            <AppBar
                position='static'
                sx={{
                    backgroundColor: 'white',
                    boxShadow: 'none',
                    borderBottom: '1px solid #b8b8b8'
                }}>
                <Toolbar>
                    <Container
                        maxWidth='xl'
                        sx={{
                            display: 'flex',
                            justifyContent: isLargeSize ? 'space-between' : 'center',
                            alignItems: 'center',
                            padding: 0
                        }}>
                        {!isLargeSize ?
                            (
                                <Box
                                    display='flex'
                                    alignItems='center'
                                    width='100%'
                                >
                                    <IconButton
                                        aria-label="menu"
                                        sx={{
                                            padding: 0,
                                            height: isXsScreen ? 25 : 45,
                                            marginRight: isXsScreen ? 2 : 5,
                                        }}
                                        onClick={() => navigate("")}
                                    >
                                        <img src="/logo.png" alt="" height='100%' />
                                    </IconButton>
                                    <TextField
                                        placeholder='Search'
                                        size='small'
                                        type="search"
                                        fullWidth
                                        sx={{
                                            flexGrow: 1
                                        }}
                                    />
                                </Box>
                            )
                            :
                            (
                                <>
                                    <Box
                                        display='flex'
                                        alignItems='center'
                                        justifyContent='space-between'
                                        width='100%'
                                    >
                                        <IconButton
                                            aria-label="menu"
                                            sx={{
                                                height: 65
                                            }}
                                            onClick={() => navigate("")}
                                        >
                                            <img src="/logo.png" alt="" height='100%' />
                                        </IconButton>
                                        <TextField
                                            placeholder='Search'
                                            size='small'
                                            type="search"
                                            fullWidth
                                            sx={{
                                                flexGrow: 1,
                                                maxWidth: 500,
                                                mx: 5
                                            }}
                                        />
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                        <IconButton
                                            sx={{
                                                color: '#1A2023',
                                                mr: 8
                                            }}>
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
                            )
                        }
                    </Container>
                </Toolbar>
            </AppBar>
        </Box >
    )
}

export default UserHeader
