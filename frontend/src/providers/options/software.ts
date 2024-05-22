import { API_URL } from "../data";
import axios from 'axios';

const API_SOFTWARE = `${API_URL}/software`

export const getAllSoftware = async () => {
    try {
        const response = await axios.get(`${API_SOFTWARE}`);
        const data = response.data.map((item:any) => ({
            ...item,
            ENTRY_DATE: new Date(item.ENTRY_DATE).toISOString().split('T')[0]
        }));
        return {
            success: true,
            software: data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al obtener el software.",
            },
        };
    }
};

export const getSoftware = async (softwareId:number) => {
    try {
        const response = await axios.get(`${API_SOFTWARE}/${softwareId}`);
        const data = response.data;
        data.ENTRY_DATE = new Date(data.ENTRY_DATE).toISOString().split('T')[0];
        return {
            success: true,
            software: data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al obtener el software.",
            },
        };
    }
};


export const addSoftware = async (software:{}) => {
    try {
        const response = await axios.post(`${API_SOFTWARE}`, software);
        const data = response.data;
        return {
            success: true,
            software: data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al añadir el software.",
            },
        };
    }
};

export const editSoftware = async (softwareId: number, software:{}) => {
    try {
        const response = await axios.put(`${API_SOFTWARE}/${softwareId}`, software);
        const data = response.data;
        return {
            success: true,
            software: data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al editar el software.",
            },
        };
    }
};

export const deleteSoftware = async (softwareId: number) => {
    try {
        const response = await axios.delete(`${API_SOFTWARE}/${softwareId}`);
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
                message: "message" in error ? error.message : "Error al eliminar el software.",
            },
        };
    }
};
