import axios from "axios";
import { UserCreateRequest } from "../pages/Register";
import api from "../constants/ApiUrl";

export const callCreateUser = async (user: UserCreateRequest) => {
    const { data } = await axios({
        method: 'POST',
        url: `${api}/api/users`,
        data: user
    })

    return data
}