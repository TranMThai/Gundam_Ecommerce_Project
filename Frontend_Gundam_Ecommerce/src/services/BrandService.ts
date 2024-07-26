import axios from "axios"
import api from "../constants/ApiUrl"
import { getToken } from "./TokenService"

export const callGetBrand = async () => {
    const {data} = await axios({
        method: 'GET',
        url: `${api}/api/brands`,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    return data.result
}