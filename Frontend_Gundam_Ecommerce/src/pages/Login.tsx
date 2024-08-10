import { Button, Checkbox, Container, FormControlLabel, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import UserPayloadReducer, { userPayloadSelector } from '../redux/reducer/UserPayloadReducer'
import { callLogin } from '../services/AuthService'
import { getToken, saveToken } from '../services/TokenService'
import Authentication from '../types/Authentication'
import { ADMIN, USER } from '../constants/Roles'
import { OAuthConfig } from '../config/config'

const Login: React.FC = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(userPayloadSelector);

  const [auth, setAuth] = useState<Authentication>({
    username: "",
    password: ""
  })

  const [isShow, setIsShow] = useState<boolean>(false)

  const { client_id, auth_uri, redirect_uri } = OAuthConfig

  const urlLoginGoogle = `${auth_uri}?redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&client_id=${client_id}&scope=openid%20email%20profile`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAuth({
      ...auth,
      [name]: value
    })
  }

  const handleShow = () => {
    setIsShow(!isShow)
  }

  const login = async () => {
    try {
      const res = await callLogin(auth);
      saveToken(res.result.token);
      dispatch(UserPayloadReducer.actions.setUserPayload(getToken()));
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  useEffect(() => {
    switch (user?.scope) {
      case ADMIN:
        navigate("/admin/product")
        break
      case USER:
        navigate("/")
        break
    }
  }, [user])

  const loginWithGoogle = () => {
    window.location.href = urlLoginGoogle
  }

  return (
    <Container
      maxWidth='sm'
    >
      <Stack
        direction='column'
        spacing={5}
        mx={2}
        justifyContent="center"
        alignItems="center"
        sx={{ height: '100vh' }}
      >
        <Typography
          sx={{
            fontSize: '2em'
          }}
        >
          Sign in
        </Typography>
        <TextField
          fullWidth
          label="Username"
          name='username'
          onChange={handleChange}
        />
        <Stack
          width='100%'
          gap={2}
        >
          <TextField
            fullWidth
            type={isShow ? 'text' : 'password'}
            label="Password"
            name='password'
            onChange={handleChange}
          />
          <FormControlLabel control={<Checkbox checked={isShow} onClick={handleShow} />} label="Show password" />
        </Stack>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          width='100%'
        >
          <Link to={'/register'}>Create account</Link>
          <Button
            variant='contained'
            onClick={login}
            sx={{
              padding: '.6em 2em'
            }}
          >
            Login
          </Button>
        </Stack>
        <Stack
          width='100%'
        >
          <Button
            fullWidth
            variant='outlined'
            onClick={loginWithGoogle}
          >
            <img src="/google-icon.svg" alt="" width='40px' />
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 20,
                ml: 1,
                textTransform: 'capitalize'
              }}
            >
              Google
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}

export default Login