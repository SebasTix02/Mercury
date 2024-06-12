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
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al obtener los bienes",
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
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al obtener los bienes",
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
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al añadir el bien",
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
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al editar el bien",
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
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al eliminar el bien",
            },
        };
    }
};
