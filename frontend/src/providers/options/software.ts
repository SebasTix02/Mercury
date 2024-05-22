import { API_URL } from "../data";
import axios from 'axios';

const API_SOFTWARE = `${API_URL}/software`

export const getAllSoftware = async () => {
    try {
        const response = await axios.get(`${API_SOFTWARE}`);
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
                message: "message" in error ? error.message : "Error al obtener el software.",
            },
        };
    }
};

export const getSoftware = async (softwareId:number) => {
    try {
        const response = await axios.get(`${API_SOFTWARE}/${softwareId}`);
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
                message: "message" in error ? error.message : "Error al obtener el software.",
            },
        };
    }
};


export const addLocation = async (location:{}) => {
    try {
        const response = await axios.post(`${API_SOFTWARE}`, location);
        const data = response.data;
        return {
            success: true,
            location: data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al añadir la ubicación.",
            },
        };
    }
};

export const editLocation = async (locationId: number, location:{}) => {
    try {
        const response = await axios.put(`${API_SOFTWARE}/${locationId}`, location);
        const data = response.data;
        return {
            success: true,
            location: data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al editar la ubicación.",
            },
        };
    }
};

export const deleteLocation = async (locationId: number) => {
    try {
        const response = await axios.delete(`${API_SOFTWARE}/${locationId}`);
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
                message: "message" in error ? error.message : "Error al eliminar la ubicación.",
            },
        };
    }
};
