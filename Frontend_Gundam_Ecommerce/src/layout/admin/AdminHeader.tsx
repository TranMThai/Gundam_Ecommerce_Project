import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserPayloadReducer from '../../redux/reducer/UserPayloadReducer'
import { deleteToken } from '../../services/TokenService'

interface IProps {
    handleCollapse: () => void,
    handleToggled: () => void
    broken: boolean
}

const AdminHeader: React.FC<IProps> = ({ handleCollapse, handleToggled, broken }) => {

    const dispatch = useDispatch()

    // const user = useSelector(userPayloadSelector)

    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        deleteToken()
        dispatch(UserPayloadReducer.actions.setUserNull(null));
        navigate('/')
    };

    return (
        <Box
            position='sticky'
            top={0}
        >
            <AppBar
                position='static'
                sx={{
                    backgroundColor: 'white',
                    boxShadow: 'none'
                }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{
                            mr: 2,
                            color: '#1A2023'
                        }}
                        onClick={broken ? handleToggled : handleCollapse}
                    >
                        <i className="fa-solid fa-bars fs-2" />
                    </IconButton>
                    <Box
                        sx={{
                            flexGrow: 1
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            sx={{
                                float: 'right',
                                color: '#1A2023'
                            }}
                            onClick={handleMenu}
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
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default AdminHeader