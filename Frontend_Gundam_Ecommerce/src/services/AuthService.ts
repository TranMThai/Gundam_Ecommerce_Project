import axios from "axios"
import api from "../constants/ApiUrl"
import Authentication from "../types/Authentication"

export const callLogin = async (auth: Authentication) => {
    const {data} = await axios({
        method: 'POST',
        url: `${api}/auth/token`,
        data: auth
    })

    return data
}