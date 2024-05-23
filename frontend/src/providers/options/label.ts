import { message } from "antd";
import { API_URL } from "../data";
import axios from 'axios';

const API_LABEL = `${API_URL}/`

export const getInfoLabels = async () => {
    try {
        const response = await axios.get(`${API_LABEL}`);
        const data = response.data.map((item:any) => ({
        }));
        return {
            success: true,
            labels: data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al obtener la información",
            },
        };
    }
};