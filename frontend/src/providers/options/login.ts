import { API_URL } from "../data";
import axios from 'axios';

const API_LOGIN = `${API_URL}/login`

export const loginUser = async (loginData:any) => {
    try {
        const response = await axios.post(`${API_LOGIN}`, loginData);
        const data = response.data;
        return {
            success: true,
            user: data,
        };
    } catch (e) {
        const error:any = e as Error;
        console.log(error.response.data.error)
        return {
            success: false,
            error: {
                message: "message" in error ? error.response.data.error : "Error al loguearse",
            },
        };
    }
};

