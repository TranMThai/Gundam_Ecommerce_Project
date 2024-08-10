import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ADMIN, USER } from '../constants/Roles'
import UserPayloadReducer, { userPayloadSelector } from '../redux/reducer/UserPayloadReducer'
import { getToken, saveToken } from '../services/TokenService'

const Authenticate: React.FC = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(userPayloadSelector);

    const fetch = async () => {
        const params = new URL(window.location.href)
        const code = params.searchParams.get("code")
        try {
            const { data } = await axios({
                method: 'POST',
                url: `http://localhost:8080/auth/outbound/authentication`,
                params: {
                    code: code
                }
            });
            saveToken(data.result.token);
            dispatch(UserPayloadReducer.actions.setUserPayload(getToken()));
        } catch (error) {

        }
    };

    useEffect(() => {
        fetch()
    }, [])

    useEffect(() => {
        switch (user?.scope) {
            case ADMIN:
                navigate("/admin/product")
                break
            case USER:
                navigate("/home")
                break
        }
    }, [user])

    return (
        <Box
            height='100vh'
            width='100vw'
            display="flex"
            justifyContent='center'
            alignItems='center'
        >
            <Stack>
                <CircularProgress
                    size={100}
                />
                <Typography
                    align='center'
                >
                    Loading...</Typography>
            </Stack>
        </Box>
    )
}

export default Authenticate