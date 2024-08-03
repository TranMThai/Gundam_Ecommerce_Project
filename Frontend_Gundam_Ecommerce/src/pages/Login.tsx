import { Button, Checkbox, Container, FormControlLabel, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { callLogin } from '../services/AuthService'
import { saveToken } from '../services/TokenService'
import Authentication from '../types/Authentication'

const Login: React.FC = () => {

  const navigate = useNavigate()

  const [auth, setAuth] = useState<Authentication>({
    username: "",
    password: ""
  })

  const [isShow, setIsShow] = useState<boolean>(false)

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
    const res = await callLogin(auth)
    saveToken(res.result.token, navigate)
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
      </Stack>
    </Container>
  )
}

export default Login