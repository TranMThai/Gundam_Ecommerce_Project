import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { callCreateUser } from '../services/UserService'

export interface UserCreateRequest {
  username: string,
  password: string,
  first_name: string,
  last_name: string,
  gender: boolean,
  email: string,
  birth: string,
  id_role: number
}

const Register: React.FC = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState<UserCreateRequest>({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    gender: true,
    email: '',
    birth: dayjs().format('YYYY-MM-DD'),
    id_role: 2
  })
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [isShow, setIsShow] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }
  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }

  const handleBirth = (e: dayjs.Dayjs | null) => {
    if (e) {
      setUser({
        ...user,
        birth: e.format('YYYY-MM-DD')
      })
    }
  }

  const handleShow = () => {
    setIsShow(!isShow)
  }

  const signUp = () => {
    const callSignUp = async () => {
      try {
        await callCreateUser(user)
        navigate("/login")
      } catch (error) {

      }
    }
    if (confirmPassword === user.password){
      callSignUp()
    }
  }

  return (
    <Container
      maxWidth='md'
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ height: '100vh' }}
      >
        <Typography
          sx={{
            fontSize: '2em',
            mb: 3
          }}
        >
          Sign up
        </Typography>
        <Grid container >
          <Grid item md={6} xs={12}>
            <Stack
              gap={4}
              px={{
                md: 3,
                xs: 0
              }}
            >
              <TextField
                fullWidth
                label="Username"
                name='username'
                onChange={handleChange}
              />
              <TextField
                fullWidth
                type={isShow ? 'text' : 'password'}
                label="Password"
                name='password'
                onChange={handleChange}
              />
              <Stack
                width='100%'
                gap={1}
              >
                <TextField
                  fullWidth
                  type={isShow ? 'text' : 'password'}
                  label="Confirm Password"
                  name='confirmPassword'
                  onChange={handleConfirmPassword}
                />
                <FormControlLabel control={<Checkbox checked={isShow} onClick={handleShow} />} label="Show password" />
              </Stack>
            </Stack>
          </Grid>
          <Grid item md={6} xs={12}>
            <Stack
              gap={4}
              px={{
                md: 3,
                xs: 0
              }}
            >
              <TextField
                fullWidth
                label="First name"
                name='first_name'
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Last name"
                name='last_name'
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Email"
                name='email'
                onChange={handleChange}
              />

              <FormControl>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  name="gender"
                  value={user.gender}
                  sx={{ my: 1 }}
                  onChange={handleChange}
                >
                  <Stack
                    direction='row'
                  >
                    <FormLabel><Radio value={true} /> Male</FormLabel>
                    <FormLabel><Radio value={false} /> Female</FormLabel>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Birth'
                  value={dayjs(user.birth)}
                  sx={{
                    width: '100%'
                  }}
                  onChange={handleBirth}
                />
              </LocalizationProvider>

            </Stack>
          </Grid>
        </Grid>

        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          width='100%'
          sx={{
            px: {
              md: 3,
              xs: 0
            },
            mt: 5
          }}
        >
          <Box
            display='flex'
          >
            <Typography mr={1.5}>
              Already have account?
            </Typography>
            <Link to={'/login'}>Sign in here</Link>
          </Box>
          <Button
            variant='contained'
            sx={{
              padding: '.6em 2em'
            }}
            onClick={signUp}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}

export default Register

