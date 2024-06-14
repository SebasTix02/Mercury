import { message } from "antd";
import { API_QR } from "../data";
import axios from 'axios';
import { saveAs } from 'file-saver';
const API_LABEL = `${API_QR}`;

interface Asset {
    assetKey: number;
    isComputer: number | null;
}

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
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};

export const sendAssetKeys = async (assets: Asset[]) => {
    try {
        const response = await axios.post(API_LABEL, assets, { responseType: 'blob' });
        saveAs(new Blob([response.data]), 'qr_tags.pdf');

        return response.data;
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};
