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
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al obtener las dependencias.",
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
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al obtener la dependencia.",
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
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al añadir la dependencia.",
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
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al editar la dependencia.",
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
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al eliminar la dependencia.",
            },
        };
    }
};
