import { message } from "antd";
import { API_QR } from "../data";
import axios from 'axios';

const API_LABEL = `${API_QR}`;

export const getInfoLabels = async () => {
    try {
        const response = await axios.get(`${API_LABEL}`);
        const data = response.data.map((item: any) => ({
            ...item
        }));
        return {
            success: true,
            categories: data,
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

export const sendAssetKeys = async (assets: { assetKey: number, isComputer: number | null }[]) => {
    try {
        const response = await axios.post(API_LABEL, assets);
        return response.data;
    } catch (e) {
        const error = e as Error;
        message.error(`Error al enviar los asset keys: ${error.message}`);
        throw error;
    }
};
