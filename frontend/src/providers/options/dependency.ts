import { API_URL } from "../data";
import axios from 'axios';

const API_DEPENDENCY = `${API_URL}/dependency`

export const getAllDependencies = async () => {
    try {
        const response = await axios.get(`${API_DEPENDENCY}`);
        const data = response.data.map((item:any) => ({
            ...item,
            CREATION_DATE: new Date(item.CREATION_DATE).toISOString().split('T')[0]
        }));
        return {
            success: true,
            dependencies: data,
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

export const getDependency = async (dependencyId:number) => {
    try {
        const response = await axios.get(`${API_DEPENDENCY}/${dependencyId}`);
        const data = response.data;
        data.CREATION_DATE = new Date(data.CREATION_DATE).toISOString().split('T')[0]
        return {
            success: true,
            dependency: data,
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


export const addDependency = async (name:{}) => {
    try {
        const response = await axios.post(`${API_DEPENDENCY}`, name);
        const data = response.data;
        return {
            success: true,
            dependency: data,
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

export const editDependency = async (dependencyId: number, name:{}) => {
    try {
        const response = await axios.put(`${API_DEPENDENCY}/${dependencyId}`, name);
        const data = response.data;
        return {
            success: true,
            dependency: data,
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

export const deleteDependency = async (dependencyId: number) => {
    try {
        const response = await axios.delete(`${API_DEPENDENCY}/${dependencyId}`);
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
