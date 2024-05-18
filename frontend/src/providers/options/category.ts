import { API_URL } from "../data";
import axios from 'axios';

const API_CATEGORY = `${API_URL}/category`

export const getAllCategories = async () => {
    try {
        const response = await axios.get(`${API_CATEGORY}`);
        const data = response.data.map((item:any) => ({
            ...item,
            CREATION_DATE: new Date(item.CREATION_DATE).toISOString().split('T')[0]
        }));
        return {
            success: true,
            categories: data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al obtener las categorías",
            },
        };
    }
};

export const getCategory = async (categoryId:number) => {
    try {
        const response = await axios.get(`${API_CATEGORY}/${categoryId}`);
        const data = response.data;
        data.CREATION_DATE = new Date(data.CREATION_DATE).toISOString().split('T')[0]
        return {
            success: true,
            category: data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al obtener la categoría",
            },
        };
    }
};


export const addCategory = async (name:{}) => {
    try {
        const response = await axios.post(`${API_CATEGORY}`, name);
        const data = response.data;
        return {
            success: true,
            category: data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al añadir la categoría.",
            },
        };
    }
};

export const editCategory = async (categoryId: number, name:{}) => {
    try {
        const response = await axios.put(`${API_CATEGORY}/${categoryId}`, name);
        const data = response.data;
        return {
            success: true,
            category: data,
        };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            error: {
                message: "message" in error ? error.message : "Error al editar la categoría.",
            },
        };
    }
};

export const deleteCategory = async (categoryId: number) => {
    try {
        const response = await axios.delete(`${API_CATEGORY}/${categoryId}`);
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
                message: "message" in error ? error.message : "Error al eliminar la categoría.",
            },
        };
    }
};
