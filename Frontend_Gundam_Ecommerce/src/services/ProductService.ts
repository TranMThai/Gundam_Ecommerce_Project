import axios from "axios"
import api from "../constants/ApiUrl"
import { getToken } from "./TokenService"

export const callGetAllProduct = async () => {
    const { data } = await axios({
        method: 'GET',
        url: `${api}/api/products`
    });
    return data.result;
};

export const callGetProductById = async (id: number|string) => {
    const { data } = await axios({
        method: 'GET',
        url: `${api}/api/products/${id}`
    });
    return data.result;
};

export const callAddProduct = async (productData: FormData) => {
    const { data } = await axios({
        method: 'POST',
        url: `${api}/api/products`,
        data: productData,
        headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'multipart/form-data'
        }
    });
    return data.result;
};

export const callUpdateProduct = async (productData: FormData) => {
    const { data } = await axios({
        method: 'PUT',
        url: `${api}/api/products/update`,
        data: productData,
        headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'multipart/form-data'
        }
    });
    return data.result;
};

export const callUpdateStatus = async (id: number|string) => {
    const { data } = await axios({
        method: 'PUT',
        url: `${api}/api/products/update_status/${id}`,
    });
    return data.result;
};
