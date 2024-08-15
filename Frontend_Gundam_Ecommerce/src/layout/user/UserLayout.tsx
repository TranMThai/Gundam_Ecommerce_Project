import { Box, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import UserHeader from './UserHeader'
import { useDispatch, useSelector } from 'react-redux'
import UserPayloadReducer, { userPayloadSelector } from '../../redux/reducer/UserPayloadReducer'
import { deleteToken } from '../../services/TokenService'
import UserFooter from './UserFooter'

const UserLayout: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(userPayloadSelector)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        deleteToken()
        dispatch(UserPayloadReducer.actions.setUserNull(null));
        navigate('/')
    };

    return (
        <Box>
            <UserHeader
                handleMenu={handleMenu}
            />
            <Outlet />
            <UserFooter
                handleMenu={handleMenu}
            />
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    user ?
                        (
                            <Box>
                                <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Box>
                        )
                        :
                        (
                            <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
                        )
                }
            </Menu>
        </Box>
    )
}

export default UserLayout