import { API_URL } from "../data";
import axios from 'axios';

const API_ASSET = `${API_URL}/asset`;

export const getAllAssets = async () => {
    try {
        const response = await axios.get(`${API_ASSET}`);
        const data = response.data;
        return {
            success: true,
            assets: data,
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

export const getAssetByAssetKey = async (assetKey: number) => {
    try {
        const response = await axios.get(`${API_ASSET}/${assetKey}`);
        const data = response.data;
        return {
            success: true,
            asset: data,
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

export const addAsset = async (assetData: any) => {
    try {
        const response = await axios.post(`${API_ASSET}`, assetData);
        const data = response.data;
        return {
            success: true,
            asset: data,
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

export const editAsset = async (assetKey: number, assetData: any) => {
    try {
        const response = await axios.put(`${API_ASSET}/${assetKey}`, assetData);
        const data = response.data;
        return {
            success: true,
            asset: data,
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

export const deleteAsset = async (assetKey: number) => {
    try {
        const response = await axios.delete(`${API_ASSET}/${assetKey}`);
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
