import { API_URL } from "../data";
import axios from 'axios';

const API_DASHBOARD = `${API_URL}/dashboard`

export const getDashboardValues = async () => {
    try {
        const response = await axios.get(`${API_DASHBOARD}`);
        const data = response.data
        return {
            success: true,
            dashboard: data,
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
