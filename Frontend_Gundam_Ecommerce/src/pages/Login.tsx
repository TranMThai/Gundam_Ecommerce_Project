import React, { useState } from 'react'
import Authentication from '../types/Authentication'
import { callLogin } from '../services/AuthService'
import { saveToken } from '../services/TokenService'

const Login: React.FC = () => {

  const [auth, setAuth] = useState<Authentication>({
    username: "",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAuth({
      ...auth,
      [name]: value
    })
  }

  const login = async () => {
    const res = await callLogin(auth)
    saveToken(res.result.token)
  }

  return (
    <div>
      <div>
        Username:
        <input type="text" name='username' onChange={handleChange} />
      </div>
      <div>
        Password:
        <input type="text" name='password' onChange={handleChange} />
      </div>
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login