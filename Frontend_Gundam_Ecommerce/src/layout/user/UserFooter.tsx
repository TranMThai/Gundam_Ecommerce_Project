import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { numberCartStyle } from '../../styles/styles';

interface IProps {
    isLargeSize: boolean,
    handleMenu: (event: React.MouseEvent<HTMLElement>) => void
}

const UserFooter: React.FC<IProps> = ({ isLargeSize, handleMenu }) => {
    const navigate = useNavigate()
    const [bottomNavValue, setBottomNavValue] = useState<number>(0);

    return (
        <>
            {
                !isLargeSize && (
                    <>
                        <Box height={65} />
                        <BottomNavigation
                            value={bottomNavValue}
                            onChange={(_, newValue) => {
                                setBottomNavValue(newValue);
                            }}
                            showLabels
                            sx={{
                                position: 'fixed',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                zIndex: 1,
                                boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <BottomNavigationAction
                                label="Home"
                                icon={<i className='fa-solid fa-house fs-2' />}
                                onClick={() => navigate("/")}
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
                                onClick={() => navigate("/cart")}
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
                    </>
                )
            }
        </>
    )
}

export default UserFooter