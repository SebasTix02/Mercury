import { API_URL } from "../data";
import axios from 'axios';

const API_COMPUTER = `${API_URL}/computer`;

export const getAllComputers = async () => {
    try {
        const response = await axios.get(`${API_COMPUTER}`);
        const data = response.data;
        return {
            success: true,
            computers: data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al obtener computadores",
            },
        };
    }
};

export const getComputerByAssetKey = async (assetKey: number) => {
    try {
        const response = await axios.get(`${API_COMPUTER}/${assetKey}`);
        const data = response.data;
        return {
            success: true,
            computer: data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al obtener computador",
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
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al añadir computador",
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
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al editar computador",
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
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al eliminar computador",
            },
        };
    }
};