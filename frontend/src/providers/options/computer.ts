import { API_URL } from "../data";
import axios from 'axios';

const API_COMPUTER = `${API_URL}/computer`;

export const getAllComputers = async () => {
    try {
        const response = await axios.get(`${API_COMPUTER}`);
        const data = response.data.map((item:any) => ({
            ...item,
            ENTRY_DATE: new Date(item.ENTRY_DATE).toISOString().split('T')[0]
        }));
        return {
            success: true,
            computers: data,
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

export const getComputerByAssetKey = async (assetKey: number) => {
    try {
        const response = await axios.get(`${API_COMPUTER}/${assetKey}`);
        const data = response.data;
        data.ENTRY_DATE = new Date(data.ENTRY_DATE).toISOString().split('T')[0];
        return {
            success: true,
            computer: data,
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

export const addComputer = async (computerData: any) => {
    try {
        const response = await axios.post(`${API_COMPUTER}`, computerData);
        const data = response.data;
        return {
            success: true,
            computer: data,
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

export const editComputer = async (assetKey: number, computerData: any) => {
    try {
        const response = await axios.put(`${API_COMPUTER}/${assetKey}`, computerData);
        const data = response.data;
        return {
            success: true,
            computer: data,
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

export const deleteComputer = async (assetKey: number) => {
    try {
        const response = await axios.delete(`${API_COMPUTER}/${assetKey}`);
        const data = response.data;
        return {
            success: true,
            message: data.message,
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