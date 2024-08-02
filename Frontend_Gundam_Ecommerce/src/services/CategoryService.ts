import axios from "axios"
import api from "../constants/ApiUrl"
import { getToken } from "./TokenService"
import Category from "../types/Category"

export const callGetAllCategory = async () => {
    const { data } = await axios({
        method: 'GET',
        url: `${api}/api/categories`,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    return data.result
}

export const callGetCategoryByCode = async (code: string) => {
    const { data } = await axios({
        method: 'GET',
        url: `${api}/api/categories/${code}`,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    return data.result
}

export const callSaveCategory = async (category: Category) => {
    const { data } = await axios({
        method: 'POST',
        url: `${api}/api/categories`,
        data: category,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    return data.result
}

export const callDeleteCategoryByCode = async (code: string) => {
    await axios({
        method: 'DELETE',
        url: `${api}/api/categories/${code}`,
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}