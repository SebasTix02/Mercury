import { API_URL } from "../data";
import axios from 'axios';

const API_BUILDING = `${API_URL}/building`

export const getAllBuildings = async () => {
    try {
        const response = await axios.get(`${API_BUILDING}`);
        const data = response.data.map((item:any) => ({
            ...item,
            CREATION_DATE: new Date(item.CREATION_DATE).toISOString().split('T')[0]
        }));
        return {
            success: true,
            buildings: data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al obtener los bloques.",
            },
        };
    }
};

export const getBuilding = async (buildingId:number) => {
    try {
        const response = await axios.get(`${API_BUILDING}/${buildingId}`);
        const data = response.data;
        data.CREATION_DATE = new Date(data.CREATION_DATE).toISOString().split('T')[0]
        return {
            success: true,
            building: data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al obtener el bloque.",
            },
        };
    }
};


export const addBuilding = async (name:{}) => {
    try {
        const response = await axios.post(`${API_BUILDING}`, name);
        const data = response.data;
        return {
            success: true,
            building: data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al añadir el bloque.",
            },
        };
    }
};

export const editBuilding = async (buildingId: number, name:{}) => {
    try {
        const response = await axios.put(`${API_BUILDING}/${buildingId}`, name);
        const data = response.data;
        return {
            success: true,
            building: data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al editar el bloque.",
            },
        };
    }
};

export const deleteBuilding = async (buildingId: number) => {
    try {
        const response = await axios.delete(`${API_BUILDING}/${buildingId}`);
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
                message: "message" in error ? error.message : "Error al eliminar el bloque.",
            },
        };
    }
};
