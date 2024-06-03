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
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al obtener los valores del Dashboard.",
            },
        };
    }
};
