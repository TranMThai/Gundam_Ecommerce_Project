import { NavigateFunction, useNavigate } from "react-router-dom";
import { ADMIN } from "../constants/Roles";
import { author } from "./AuthService";


export const saveToken = (token: string, navigate: NavigateFunction) => {
    localStorage.setItem('user', token);
    if (author() == ADMIN) {
        navigate('/admin/product')
    }
}

export const getToken = () => {
    return localStorage.getItem('user')
}

export const deleteToken = () => {
    return localStorage.removeItem('user')
}