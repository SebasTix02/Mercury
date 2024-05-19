import { API_URL } from "../data";
import axios from 'axios';

const API_LOCATION = `${API_URL}/location`

export const getAllLocations = async () => {
    try {
        const response = await axios.get(`${API_LOCATION}`);
        const data = response.data;
        return {
            success: true,
            locations: data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al obtener las ubicaciones.",
            },
        };
    }
};

export const getLocation = async (locationId:number) => {
    try {
        const response = await axios.get(`${API_LOCATION}/${locationId}`);
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
                message: "message" in error ? error.message : "Error al obtener las ubicaciones.",
            },
        };
    }
};


export const addLocation = async (location:{}) => {
    try {
        const response = await axios.post(`${API_LOCATION}`, location);
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
        const response = await axios.put(`${API_LOCATION}/${locationId}`, location);
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
        const response = await axios.delete(`${API_LOCATION}/${locationId}`);
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
