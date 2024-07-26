import axios from "axios"
import api from "../constants/ApiUrl"
import { getToken } from "./TokenService"
import { ProductRequest } from "../pages/admin/productManager/create/ProductCreate"

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