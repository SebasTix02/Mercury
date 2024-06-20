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
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

