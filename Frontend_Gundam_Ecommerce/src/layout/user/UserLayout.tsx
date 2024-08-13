import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import UserHeader from './UserHeader'

const UserLayout: React.FC = () => {
    return (
        <Box>
            <UserHeader />
            <Outlet />
        </Box>
    )
}

export default UserLayout