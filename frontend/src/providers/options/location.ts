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
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
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
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
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
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
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
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
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
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};
