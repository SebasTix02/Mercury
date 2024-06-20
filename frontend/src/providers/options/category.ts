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
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
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
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
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
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
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
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
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
    } catch (error:any) {
        return {
            success: false,
            error: {
                message: error.response ? error.response.data.error : 'Sin respuesta desde el servidor Back-end.',
            },
        };
    }
};
