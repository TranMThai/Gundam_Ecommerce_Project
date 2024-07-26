import axios from "axios"
import api from "../constants/ApiUrl"
import { getToken } from "./TokenService"

export const callGetCategory = async () => {
    const {data} = await axios({
        method: 'GET',
        url: `${api}/api/categories`,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    return data.result
}