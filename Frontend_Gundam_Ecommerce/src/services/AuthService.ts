import axios from "axios"
import api from "../constants/ApiUrl"
import Authentication from "../types/Authentication"
import { jwtDecode } from "jwt-decode"
import JwtPayload from "../types/JwtPayload"
import { getToken } from "./TokenService"

export const callLogin = async (auth: Authentication) => {
    const { data } = await axios({
        method: 'POST',
        url: `${api}/auth/token`,
        data: auth
    })

    return data
}

export const author = () => {
    try {
        const payload = jwtDecode<JwtPayload>(getToken() ?? '')
        return payload.scope
    } catch (error) {
        return null
    }
}