import axios from "axios"
import api from "../constants/ApiUrl"
import { getToken } from "./TokenService"
import Brand from "../types/Brand"

export const callGetAllBrand = async () => {
    const {data} = await axios({
        method: 'GET',
        url: `${api}/api/brands`,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    return data.result
}

export const callGetBrandByCode = async (code: string) => {
    const { data } = await axios({
        method: 'GET',
        url: `${api}/api/brands/${code}`,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    return data.result
}

export const callSaveBrand = async (brand: Brand) => {
    const { data } = await axios({
        method: 'POST',
        url: `${api}/api/brands`,
        data: brand,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    return data.result
}

export const callDeleteBrandByCode = async (code: string) => {
    await axios({
        method: 'DELETE',
        url: `${api}/api/brands/${code}`,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}